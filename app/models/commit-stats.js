import DS from 'ember-data';

export default DS.Model.extend({
  total: DS.attr('number'),
  additions: DS.attr('number'),
  deletions: DS.attr('number')
});
