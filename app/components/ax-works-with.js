import Ember from 'ember';

export default Ember.Component.extend({
  init: function () {
    Ember.run.scheduleOnce('afterRender', () => {
      Ember.$(document).ready(function(){
        Ember.$('.tooltipped').tooltip({delay: 50});
      });
    });
    return this._super();
  },
  people: function () {
    var result = this.get('store').all('user');
    var dictionary = {};
    var people = [];
    result.forEach(person => {
      if (person.get('login') === this.get('user.login')) {
        return;
      }
      dictionary[person.get('login')] = person;
    });

    for (var key in dictionary) {
      if (typeof key === 'string') {
        people.push(dictionary[key]);
      }
    }
    return people;
  }.property('events')
});
