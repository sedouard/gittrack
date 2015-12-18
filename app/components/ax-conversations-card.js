import Ember from 'ember';

export default Ember.Component.extend({
  issueComments: function () {
    var comments = this.get('store').all('issueCommentEvent');

    Ember.run.scheduleOnce('afterRender', () => {
      Ember.$(document).ready(function(){
        Ember.$('.collapsible').collapsible({
          accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
      });
    });

    return comments;
  }.property('events'),

  isEmpty: function () {
    return this.get('issueComments.length') === 0;
  }.property('issueComments')
});
