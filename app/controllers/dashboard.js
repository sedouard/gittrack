import Ember from 'ember';

export default Ember.Controller.extend({
  events: null,
  commits: [],
  init: function () {
    Ember.run.scheduleOnce('afterRender', () => {
      Ember.$(document).ready(() => {
        Ember.$('.scrollspy').scrollSpy({target: '.spy-active'});
      });
    });
  },
  commitsLoading: true,
  selectMenuDays: 0,
  daysBack: 0,
  daysBackObserver: Ember.observer('selectMenuDays', function () {
    this.send('changeTimeView', this.get('selectMenuDays'));
  }),
  pushEvents: function () {
    var events = this.get('events'),
        pushEvents = [];

    if (!events) {
      return pushEvents;
    }

    var newCommits = [];
    var promises = [];
    this.set('commitsLoading', true);
    events.forEach(event => {
      if (event.get('constructor.typeKey') === 'pushEvent') {
        pushEvents.push(event);
        event.get('commits').forEach(commit => {
          var promise = commit.get('commit')
          .then(commit => {
            // add a tag to this commit
            var creationDate = event.get('updated_at') || event.get('created_at');
            commit.set('created_at', creationDate);
            commit.set('repo', event.get('repo'));
            newCommits.push(commit);
          });

          promises.push(promise);
        });
      }
    });

    Ember.RSVP.all(promises)
    .then(() => {
      this.set('commits', newCommits);
      this.set('commitsLoading', false);
      Ember.run.scheduleOnce('afterRender', () => {
        Ember.$('.collapsible').collapsible({
          accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
      });
    });

    return pushEvents;
  }.property('events'),
  ranges: [
    { name: 'Today',
      daysBack: 1,
      active: true
    },
    {
      name: 'Since Yesterday',
      daysBack: 2,
      active: false
    },
    {
      name: 'Since 2 Days Ago',
      daysBack: 3,
      active: false
    },
    {
      name: 'Since 3 Days Ago',
      daysBack: 4,
      active: false
    },
    {
      name: 'Since 4 Days Ago',
      daysBack: 5,
      active: false
    },
    {
      name: 'Since 5 Days Ago',
      daysBack: 6,
      active: false
    },
    {
      name: 'Since 20 Days Ago',
      daysBack: 20,
      active: false
    }
  ],
  rangeData: function () {
    return this.get('ranges');
  }.property('ranges.@each.active')
});
