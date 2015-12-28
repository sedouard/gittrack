/*globals appInsights*/
import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    goToDashboard: function (ghUsername) {
      this.transitionTo('dashboard', this.store.find('user', ghUsername));
      appInsights.trackEvent('trackButton');
    }
  }
});
