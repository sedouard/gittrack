import Ember from 'ember';

export default Ember.Component.extend({
  totalCommits: function () {
    return this.get('store').all('commit').get('length');
  }.property('commits'),
  isEmpty: function () {
    return this.get('totalCommits') === 0;
  }.property('totalCommits')
});
