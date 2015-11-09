import Ember from 'ember';

export default Ember.Service.extend({
  getDayOfWeek: function (day) {
    var days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];

    return days[day];
  }
});
