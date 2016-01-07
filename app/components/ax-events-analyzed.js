import Ember from 'ember';

export default Ember.Component.extend({
  totalEvents: function () {
    var total = 0;

    total += this.get('store').all('pushEvent').get('length');
    total += this.get('store').all('pullRequestEvent').get('length');
    total += this.get('store').all('createEvent').get('length');
    total += this.get('store').all('issuesEvent').get('length');
    total += this.get('store').all('issueCommentEvent').get('length');
    total += this.get('store').all('pullRequestReviewCommentEvent').get('length');
    total += this.get('store').all('releaseEvent').get('length');
    total += this.get('store').all('publicEvent').get('length');
    total += this.get('store').all('watchEvent').get('length');
    total += this.get('store').all('gollumEvent').get('length');
    total += this.get('store').all('commitCommentEvent').get('length');

    return total;
  }.property('events'),
  isEmpty: function () {
    return this.get('totalEvents') === 0;
  }.property('totalEvents')
});
