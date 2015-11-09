import Ember from 'ember';

export default Ember.Route.extend({
  controller: null,
  user: Ember.computed.alias('controller.user'),
  events: Ember.computed.alias('controller.events'),
  daysBack: Ember.computed.alias('controller.daysBack'),
  eventsLoading: Ember.computed.alias('controller.eventsLoading'),
  eventsSortDesc: ['created_at:desc'],
  sortedEvents: Ember.computed.sort('events', 'eventsSortDesc'),
  model(params) {
    this.store.find('event', {actorId: params.user_id});
  },

  setupController: function (controller, user) {
    this._super(controller, user);
    this.set('controller', controller);

    controller.set('user', user);
    this._handleChangeTimeView(1);
  },

  // Pages the events store for more events
  _appendBackData: function (cutOffTime, array, page) {
    var loadedEnough = false,
        total;
    return this.store.find('event', {actorId: this.get('user.id'), page: page})
    .then(events => {
      total = events.get('meta.total');
      events.every(event => {
        var compareDateString = event.get('updated_at') || event.get('created_at');
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

      return this._appendBackData(cutOffTime, array, page + 1);
    });
  },

  _removeBackData: function (cutOffTime) {
    var totalEvents = this.get('controller.events.length');

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

    return this._removeBackData(cutOffTime);
  },

  _handleChangeTimeView: function (days) {
    var cutOffTime = new Date(Date.now() - days * 86400000);
    var daysBack = this.get('daysBack');
    var promise;

    this.set('eventsLoading', true);
    if (days === daysBack) {
      return;
    } else if (days < daysBack) {
      promise = this._removeBackData(cutOffTime);
      this.get('controller.ranges').forEach(range => {
          Ember.set(range, 'active', range.daysBack === days);
      });
      this.set('daysBack', days);
      this.set('eventsLoading', false);
    } else if (days > daysBack) {
      this._appendBackData(cutOffTime, [], 1)
      .then(() => {
        this.get('controller.ranges').forEach(range => {
            Ember.set(range, 'active', range.daysBack === days);
        });
        this.set('daysBack', days);
        this.set('eventsLoading', false);
      });
    }
  },
  actions: {
    changeTimeView: function (days) {

      this._handleChangeTimeView(days);
    }
  }
});
