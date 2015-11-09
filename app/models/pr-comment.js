import DS from 'ember-data';
export default DS.Model.extend({
  body: DS.attr('string'),
  path: DS.attr('string'),
  position: DS.attr('number'),
  original_position: DS.attr('number'),
  diff_hunk: DS.attr('string'),
  pull_request_url: DS.attr('string')
});
