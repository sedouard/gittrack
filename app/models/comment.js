import DS from 'ember-data';

export default DS.Model.extend({
  url: DS.attr('string'),
  html_url: DS.attr('string'),
  issue_url: DS.attr('string'),
  user: DS.attr('user'),
  body: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date')
});
