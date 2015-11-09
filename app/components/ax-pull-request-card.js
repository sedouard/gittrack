import Ember from 'ember';
import config from '../config/environment';
export default Ember.Component.extend({
  pullRequests: function () {
    var prs = [],
        events = this.get('events');

    if (!events) {
      return;
    }

    this.get('events')
    .forEach(event => {
      if (event.get('type') === 'pullRequestEvent') {
        prs.push(event);
      }
    });

    return prs;
  }.property('events'),

  totalChanges: function () {

    if (!this.get('pullRequests')) {
      return;
    }

    var prEvents = this.get('pullRequests');

    var changes = {
      additions: 0,
      deletions: 0
    };

    prEvents.forEach(event => {
      if (event.get('action') === 'closed') {
        changes.additions +=  event.get('additions');
        changes.deletions += event.get('deletions');
      }
    });

    Ember.Logger.debug('Changes count:');
    Ember.Logger.debug(changes);
    return changes;
  }.property('events'),

  doughnutChartData: function () {
    var dataDict = {};

    if (!this.get('pullRequests')) {
      return;
    }

    var prEvents = this.get('pullRequests'),
        color = 0;

    prEvents.forEach(event => {

      if (!dataDict[event.get('repo.name')]) {
        dataDict[event.get('repo.name')] = {
          label: event.get('repo.name'),
          value: event.get('additions') + event.get('deletions'),
          color: config.chartColors[color]
        };
        color++;
      }

      dataDict[event.get('repo.name')].value += event.get('additions') + event.get('deletions');
    });

    var data = [];
    for (var key in dataDict) {
      data.push(dataDict[key]);
    }
    Ember.Logger.debug('Chart Data:');
    Ember.Logger.debug(data);
    return data;
  }.property('events'),

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
