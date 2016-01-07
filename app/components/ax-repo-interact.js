import Ember from 'ember';

export default Ember.Component.extend({
  totalRepos: function () {
    return this.get('store').all('repo').get('length');
  }.property('events'),
  isEmpty: function () {
    return this.get('totalRepos') === 0;
  }.property('totalRepos')
});
