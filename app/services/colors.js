/* globals one */
import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
  getColorForKey: function (key) {
    if (this.get('keys')[key]) {
      return this.get('keys')[key];
    }
    var index = this.get('colorIndex');
    this.get('keys')[key] = config.chartColors[index];

    index += 1;
    if (index >= config.chartColors.length) {
      // ran out of colors!
      index = 0;
    }
    this.set('colorIndex', index);
    return this.get('keys')[key];
  },
  setAlpha: function (color, alpha) {
    return one.color(color).alpha(alpha).cssa();
  },
  getTimeChartTotalColor: function () {
    return config.totalChartColor;
  },
  colorIndex: 0,
  keys: {}
});
