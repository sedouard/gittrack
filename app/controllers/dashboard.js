/*globals appInsights, moment*/
import Ember from 'ember';

export default Ember.Controller.extend({
  events: null,
  commits: [],
  init: function () {
    Ember.run.scheduleOnce('afterRender', () => {
      Ember.$(document).ready(() => {
        Ember.$('.scrollspy').scrollSpy({target: '.spy-active'});
        Ember.$('.tooltipped').tooltip({delay: 50});
      });
    });
  },
  gittrackUrl: function () {
    Ember.Logger.debug('navbar: user =' + this.get('user'));
    return 'gittrack.io/' + this.get('user.id');
  }.property('user'),
  commitsLoading: true,
  daysBack: 0,
  /**
  Tracks actions across various cards
  **/
  _setupTrackers: function () {
    Ember.$('.commits-ul .collapsible-header').click(() => {
      appInsights.trackEvent('commitDetailsClick');
    });
    Ember.$('.commit-title').click(() => {
      appInsights.trackEvent('commitClick');
    });
    Ember.$('.conversation-ul .collapsible-header').click(() => {
      appInsights.trackEvent('conversationClick');
    });
  },
  _intialDaysBackObserve: true,
  daysBackObserver: Ember.observer('selectMenuDays', function () {

    if (this.get('_intialDaysBackObserve')) {
      this.set('_intialDaysBackObserve', true);
      return;
    }
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
        this._setupTrackers();
      });
    });

    return pushEvents;
  }.property('events'),
  latestEventDate: null,
  ranges: function () {
    var latestEventDate = this.get('latestEventDate') || new Date(Date.now());
    return [
      { name: 'Since ' + moment(latestEventDate).fromNow(),
        daysBack: 1,
        active: true
      },
      {
        name: 'Since ' + moment(latestEventDate).subtract(1, 'days').fromNow(),
        daysBack: 2,
        active: false
      },
      {
        name: 'Since ' + moment(latestEventDate).subtract(3, 'days').fromNow(),
        daysBack: 3,
        active: false
      },
      {
        name: 'Since ' + moment(latestEventDate).subtract(4, 'days').fromNow(),
        daysBack: 4,
        active: false
      },
      {
        name: 'Since ' + moment(latestEventDate).subtract(5, 'days').fromNow(),
        daysBack: 5,
        active: false
      },
      {
        name: 'Since ' + moment(latestEventDate).subtract(6, 'days').fromNow(),
        daysBack: 6,
        active: false
      },
      {
        name: 'Since ' + moment(latestEventDate).subtract(20, 'days').fromNow(),
        daysBack: 20,
        active: false
      }
    ];
  }.property('latestEventDate'),
  rangeData: function () {
    return this.get('ranges');
  }.property('ranges.@each.active')
});
