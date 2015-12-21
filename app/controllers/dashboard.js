import Ember from 'ember';

export default Ember.Controller.extend({
  events: null,
  init: function () {
    Ember.run.scheduleOnce('afterRender', () => {
      Ember.$(document).ready(() => {
        Ember.$('.scrollspy').scrollSpy({target: '.spy-active'});
      });
    });
  },
  daysBack: 0,
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
