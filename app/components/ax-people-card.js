import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    drillDownUser: function (member) {
      Ember.debug('TEST HIT!');
      Ember.debug(member);
    }
  }
});
