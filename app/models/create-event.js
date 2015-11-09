import DS from 'ember-data';
import Event from './event';

export default Event.extend({
  ref: DS.attr('string'),
  ref_type: DS.attr('branch'),
  master_branch: DS.attr('master'),
  description: DS.attr('string'),
  pusher_type: DS.attr('user')
});
