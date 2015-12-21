import DS from 'ember-data';
import env from '../config/environment';
export default DS.JSONAPIAdapter.extend({
  host: env.starsHost
});
