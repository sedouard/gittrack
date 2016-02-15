/*globals appInsights*/
import Ember from 'ember';

export default Ember.Route.extend({
  controller: null,
  user: Ember.computed.alias('controller.user'),
  events: Ember.computed.alias('controller.events'),
  daysBack: Ember.computed.alias('controller.daysBack'),
  eventsLoading: Ember.computed.alias('controller.eventsLoading'),
  eventsSortDesc: ['created_at:desc'],
  sortedEvents: Ember.computed.sort('events', 'eventsSortDesc'),

  // Pages the events store for more events
  _appendBackData: function (days, array, page) {
    var loadedEnough = false,
        total,
        latestTime,
        cutOffTime;
    return this.store.find('event', {actorId: this.get('user.id'), page: page})
    .then(events => {

      total = events.get('meta.total');
      events.every(event => {
        var compareDateString = event.get('updated_at') || event.get('created_at');

        if (!this.get('controller.latestEventDate')) {
          // if this is the very first event , set the cutOffTime
          latestTime = new Date(compareDateString).getTime();
          this.set('controller.latestEventDate', compareDateString);
        } else {
          // use the already set latest event time
          latestTime = new Date(this.get('controller.latestEventDate')).getTime();
          // move the latest time back by 1 day
          latestTime = latestTime - (1 * 86400000);
        }

        cutOffTime = new Date(latestTime - days * 86400000);
        if (cutOffTime > new Date(compareDateString)) {
          //break;
          loadedEnough = true;
          return false;
        }

        array.push(event);
        return true;
      });

    })
    .then(() => {

      if (page + 1 > total || loadedEnough) {
        this.set('controller.events', array);
        return;
      }

      return this._appendBackData(days, array, page + 1);
    });
  },

  _removeBackData: function (days) {
    var latestTime = new Date(this.get('controller.latestEventDate')).getTime();
    var totalEvents = this.get('controller.events.length');
    var cutOffTime = new Date(latestTime - days * 86400000);

    if (totalEvents === 0) {
      let newArray = [].concat(this.get('controller.events'));
      this.set('controller.events', newArray);
      return;
    }

    var lastEvent = this.get('controller.events')[totalEvents - 1];

    if (cutOffTime < new Date(lastEvent.get('created_at'))) {
      let newArray = [].concat(this.get('controller.events'));
      this.set('controller.events', newArray);
      return;
    }
    this.get('controller.events').pop();

    return this._removeBackData(days);
  },

  _handleChangeTimeView: function (days) {

    var daysBack = this.get('daysBack');
    var promise;

    this.set('eventsLoading', true);
    if (days === daysBack) {
      this.set('eventsLoading', false);
      appInsights.trackMetric('events', this.get('controller.events.length'));
      return;
    } else if (days < daysBack) {
      promise = this._removeBackData(days);
      this.get('controller.ranges').forEach(range => {
          Ember.set(range, 'active', range.daysBack === days);
      });
      this.set('daysBack', days);
      this.set('eventsLoading', false);
      appInsights.trackMetric('events', this.get('controller.events.length'));
    } else if (days > daysBack) {
      this._appendBackData(days, [], 1)
      .then(() => {
        this.get('controller.ranges').forEach(range => {
            Ember.set(range, 'active', range.daysBack === days);
        });
        this.set('daysBack', days);
        this.set('eventsLoading', false);
        appInsights.trackMetric('events', this.get('controller.events.length'));
      });
    }
  },
  actions: {
    changeTimeView: function (days) {
      this._handleChangeTimeView(days);
      this.set('controller.selectMenuDays', days);
      appInsights.trackMetric('changeTimeView', days);
    }
  }
});
