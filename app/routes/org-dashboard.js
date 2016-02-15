import BaseDashboard from './base-dashboard';

export default BaseDashboard.extend({
  model(params) {
    return this.store.find('org', params.user_id);
  },
  setupController: function (controller, user) {

    if (user.get('type') !== 'Organization') {
      this.transitionTo('dashboard', user);
    }

    controller.set('user', user);
    this._super(controller, user);
    this.set('controller', controller);
    controller.set('optIn', true);

    controller.set('user', user);
    appInsights.trackPageView('/orgs/' + user.get('login'));

    var self = this;
    Ember.run.scheduleOnce('actions', this, function () {
      // start the default page a few days back
      self.send('changeTimeView', 4);
    });
  }
});
