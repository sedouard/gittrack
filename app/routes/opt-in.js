import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function (controller, user) {
    return this.store.find('star', {id: user.id})
    .then(stars => {

      if (stars.get('length') > 0) {
        return this.transitionTo('dashboard', user);
      }
      return controller.set('user', user);
    });
  }
});
