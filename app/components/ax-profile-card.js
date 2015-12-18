import Ember from 'ember';

export default Ember.Component.extend({
  init: function () {
    Ember.run.scheduleOnce('afterRender', () => {
      Ember.$(document).ready(function(){
        Ember.$('.tooltipped').tooltip({delay: 50});
      });
    });
    return this._super();
  }
});
