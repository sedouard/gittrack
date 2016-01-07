/*globals appInsights*/
import Ember from 'ember';

export default Ember.Controller.extend({
  init: function () {
    appInsights.trackPageView('homepage');
    return this._super();
  }
});
