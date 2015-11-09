import DS from 'ember-data';

export default DS.Model.extend({
  url: DS.attr('string'),
  html_url: DS.attr('string'),
  labels_url: DS.attr('string'),
  number: DS.attr('number'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  creator: DS.belongsTo('user'),
  open_issues: DS.attr('number'),
  closed_issues: DS.attr('number'),
  state: DS.attr('string'),
  created_at: DS.attr('string'),
  updated_at: DS.attr('string'),
  due_on: DS.attr('date'),
  closed_at: DS.attr('date')
});
