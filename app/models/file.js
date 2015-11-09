import DS from 'ember-data';

export default DS.Model.extend({
  sha: DS.attr('string'),
  filename: DS.attr('string'),
  additions: DS.attr('number'),
  deletions: DS.attr('number'),
  changes: DS.attr('number'),
  blob_url: DS.attr('string'),
  raw_url: DS.attr('string'),
  contents_url: DS.attr('string'),
  patch: DS.attr('string')
});
