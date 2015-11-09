import DS from 'ember-data';
import Event from './event';

export default Event.extend({
  action: DS.attr('string'),
  url: DS.attr('string'),
  labels_url: DS.attr('string'),
  comments_url: DS.attr('string'),
  events_url: DS.attr('string'),
  html_url: DS.attr('string'),
  number: DS.attr('number'),
  title: DS.attr('string'),
  user: DS.belongsTo('user'),
  labels: DS.hasMany('label'),
  milestone: DS.belongsTo('milestone'),
  comments: DS.attr('number'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  closed_at: DS.attr('date'),
  body: DS.attr('string'),
  org: DS.attr('user')
});
