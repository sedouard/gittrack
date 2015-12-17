import Ember from 'ember';
import config from '../config/environment';
export default Ember.Component.extend({
  dateUtils: Ember.inject.service('dateUtils'),
  fileExtension: Ember.inject.service('fileExtension'),
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

    // compute languges
    this._computeLangauges();

    return data;
  }.property('commits'),

  _computeLangauges: function () {
    if (this.get('commits.length') <= 0) {
      return {};
    }
    // use dictionary here to avoid double counting
    var languages = {};
    this.get('commits').forEach(commit => {
      commit.get('files').forEach(file => {
        var extension = this.get('fileExtension').getLanguageForFile(file.get('filename'));

        if (extension) {
          languages[extension] = true;
        }
      });

      // array format is better for templates
      var languagesArray = [];
      for (var key in languages) {
        if (typeof key === 'string') {
          languagesArray.push(key);
        }
      }

      commit.set('languages', languagesArray);
    });

  },

  totalLinesCode: function () {

    var total = 0;

    this.get('commits').forEach(commit => {
      total += commit.get('stats.total');
    });

    return total;
  }.property('commits'),
  respChart: function (selector, data, options){

    // check if the option is override to exact options
    // (bar, pie and other)
    if (options == false || options == null){
        options = option;
    }

    // get selector by context
    var ctx = selector.get(0).getContext("2d");
    // pointing parent container to make chart js inherit its width
    var container = Ember.$(selector).parent();

    // enable resizing matter
    $(window).resize( generateChart );

    // this function produce the responsive Chart JS
    function generateChart(){
        // make chart width fit with its container
        var ww = selector.attr('width', Ember.$(container).width() );
        // Initiate new chart or Redraw
        new Chart(ctx).Line(data, options);
    };

    // run function - render chart at first load
    generateChart();

  },
  chartOptions: function () {
    return {
      //Boolean - Show a backdrop to the scale label
      scaleShowLabelBackdrop: true,

      //String - The colour of the label backdrop
      scaleBackdropColor: "rgba(255,255,255,0.75)",

      // Boolean - Whether the scale should begin at zero
      scaleBeginAtZero: true,

      //Number - The backdrop padding above & below the label in pixels
      scaleBackdropPaddingY: 2,

      //Number - The backdrop padding to the side of the label in pixels
      scaleBackdropPaddingX: 2,

      //Boolean - Show line for each value in the scale
      scaleShowLine: true,

      //Boolean - Stroke a line around each segment in the chart
      segmentShowStroke: true,

      //String - The colour of the stroke on each segement.
      segmentStrokeColor: "#fff",

      //Number - The width of the stroke value in pixels
      segmentStrokeWidth: 2,

      //Number - Amount of animation steps
      animationSteps: 100,

      //String - Animation easing effect.
      animationEasing: "easeOutBounce",

      //Boolean - Whether to animate the rotation of the chart
      animateRotate: true,

      //Boolean - Whether to animate scaling the chart from the centre
      animateScale: true,

      //String - A legend template
      legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

    };
  }
});
