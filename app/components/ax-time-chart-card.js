import Ember from 'ember';
import config from '../config/environment';
export default Ember.Component.extend({
  dateUtils: Ember.inject.service('dateUtils'),
  commits: [],
  commitsLoading: false,
  loadingData: Ember.computed.or('commitsLoading', 'loading'),
  init: function () {
    Ember.run.scheduleOnce('afterRender', () => {
      Ember.$(document).ready(function(){
        Ember.$('.collapsible').collapsible({
          accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
      });
    });
    return this._super();
  },
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
            newCommits.push(commit);
          })
          .then(() => {
            Ember.run.scheduleOnce('afterRender', () => {
              Ember.$(document).ready(function(){
                Ember.$('.collapsible').collapsible({
                  accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                });
              });
            });
          });

          promises.push(promise);
        });
      }
    });

    Ember.RSVP.all(promises)
    .then(() => {
      this.set('commits', newCommits);
      this.set('commitsLoading', false);
    });

    return pushEvents;
  }.property('events'),

  timeChartData: function () {

    if (this.get('commits.length') <= 0) {
      return {};
    }

    var ranges = this.get('ranges'),
        includedRanges = [];

    for (var i = 0; i < ranges.length; i++) {
      includedRanges.push(ranges[i]);

      if (ranges[i].active) {
        break;
      }
    }

    var datasets = [];
    var totals = [];
    var labels = [];
    includedRanges.forEach(range => {

      var total = 0;
      var startTime = new Date(Date.now() - (range.daysBack - 1) * 86400000);
      var cutOffTime = new Date(Date.now() - range.daysBack * 86400000);
      this.get('commits').forEach(commit => {
        // test if commit lies within target time
        var compareDate = new Date(commit.get('created_at'));
        if (compareDate > cutOffTime &&
          compareDate < startTime) {
          total += commit.get('stats.total');
        }
      });
      labels.unshift(this.get('dateUtils').getDayOfWeek(cutOffTime.getDay()));
      totals.unshift(total);
    });

    datasets.push({
      label: "Commits Over Time",
      fillColor: config.chartColors[0],
      data: totals
    });

    var data = {
      labels: labels,
      datasets: datasets
    };

    return data;
  }.property('commits'),

  totalLinesCode: function () {

    var total = 0;

    this.get('commits').forEach(commit => {
      total += commit.get('stats.total');
    });

    return total;
  }.property('commits')
});
