/* globals moment */
import Ember from 'ember';
export default Ember.Component.extend({
  colors: Ember.inject.service('colors'),
  fileExtension: Ember.inject.service('fileExtension'),
  commitsLoading: false,
  loadingData: Ember.computed.or('commitsLoading', 'loading'),
  init: function () {
    return this._super();
  },
  isEmpty: function () {
    return !this.get('timeChartData');
  }.property('timeChartData'),

  timeChartData: function () {

    if (this.get('commits.length') <= 0) {
      return null;
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
    var repoDictionary = {};
    var index = includedRanges.length - 1;
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

          // per project count
          if (!repoDictionary[commit.get('repo.name')]) {
            // create a new entry
            repoDictionary[commit.get('repo.name')] = {
              totals: []
            };
            // init array with zeros, since each day needs at least one entry
            for (let i = 0; i < includedRanges.length; i++) {
              repoDictionary[commit.get('repo.name')].totals.push(0);
            }
          }

          // push an additional total entry for this day
          repoDictionary[commit.get('repo.name')].totals[index] += commit.get('stats.total');
        }
      });
      index -= 1;
      labels.unshift(moment(cutOffTime).fromNow());
      totals.unshift(total);
    });

    datasets.push({
      label: 'Total Changes',
      fillColor: this.get('colors').getColorForKey('Lines of Code'),
      strokeColor: this.get('colors').getColorForKey('Lines of Code'),
      pointColor: this.get('colors').getColorForKey('Lines of Code'),
      data: totals
    });

    Object.keys(repoDictionary).forEach(repoName => {
      var color = this.get('colors').getColorForKey(repoName);
      datasets.push({
        label: repoName,
        fillColor: this.get('colors').setAlpha(color, 0.5),
        strokeColor: color,
        pointColor: color,
        data: repoDictionary[repoName].totals
      });
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
    this.get('commits').forEach(commit => {
      var languages = {};
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

  chartOptions: function () {
    return {
      scaleFontSize : 16,

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

      datasetStroke : true,

      datasetFill: true,

      //Number - Pixel width of dataset stroke
      datasetStrokeWidth : 5,

      //Number - Amount of animation steps
      animationSteps: 100,

      //String - Animation easing effect.
      animationEasing: "easeOutBounce",

      //Boolean - Whether to animate the rotation of the chart
      animateRotate: true,

      //Boolean - Whether to animate scaling the chart from the centre
      animateScale: true,

      //String - A legend template
      legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\" class=\"square\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

    };
  }.property()
});
