/*globals appInsights*/
import BaseDashboard from './base-dashboard';

export default BaseDashboard.extend({
  model(params) {
    return this.store.find('user', params.user_id);
  },
  setupController: function (controller, user) {
    controller.set('user', user);

    return this.store.find('star', {id: user.id})
    .then(stars => {

      if (!stars.get('firstObject')) {
        // for now go to landing
        appInsights.trackPageView('notStarred');
        console.log('user: ' + user.id + ' has not starred the repo');
        return this.transitionTo('opt-in', user);
      }
      this._super(controller, user);
      this.set('controller', controller);
      controller.set('optIn', true);

      controller.set('user', user);
      appInsights.trackPageView(user.get('login'));
      // start the default page a few days back
      this.send('changeTimeView', 4);

    });
  }
});
