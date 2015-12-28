/*globals appInsights*/
import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
  dateUtils: Ember.inject.service('dateUtils'),
  fileExtension: Ember.inject.service('fileExtension'),
  commits: [],
  commitsLoading: false,
  loadingData: Ember.computed.or('commitsLoading', 'loading'),
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

  isEmpty: function () {
    return !this.get('barChartData');
  }.property('barChartData'),

  barChartData: function () {

    var dataset = {
      label: '',
      fillColor: config.chartColors[2],
      data: []
    };
    var labels = [];
    var data = {
      labels: labels,
      datasets: [dataset]
    };

    if (this.get('commits.length') <= 0) {
      return null;
    }

    var languages = this.get('_computeLangauges');

    for (var key in languages) {
      if (typeof key === 'string') {
        labels.push(key);
        dataset.data.push(languages[key]);
      }
    }

    return data;
  }.property('commits'),

  _computeLangauges: function () {
    if (this.get('commits.length') <= 0) {
      return {};
    }
    // use dictionary here to get counts for language
    var languages = {};
    var count = 0;
    this.get('commits').forEach(commit => {
      commit.get('files').forEach(file => {
        var extension = this.get('fileExtension').getLanguageForFile(file.get('filename'));

        if (!extension) {
          return;
        }

        if (languages[extension]) {
          languages[extension] += file.get('changes');
        } else {
          languages[extension] = file.get('changes');
          count += 1;
        }

      });
    });

    appInsights.trackMetric('languageCount', count);
    return languages;
  }.property('commits'),

  chartOptions: function () {

    return {
        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero : true,

        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,

        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth : 1,

        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,

        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,

        //Boolean - If there is a stroke on each bar
        barShowStroke : true,

        //Number - Pixel width of the bar stroke
        barStrokeWidth : 2,

        //Number - Spacing between each of the X value sets
        barValueSpacing : 5,

        //Number - Spacing between data sets within X values
        barDatasetSpacing : 1,

        //String - A legend template
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

    };
  }.property()
});
