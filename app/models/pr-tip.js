import DS from 'ember-data';

export default DS.Model.extend({
  label: DS.attr('string'),
  ref: DS.attr('string'),
  sha: DS.attr('string'),
  user: DS.belongsTo('user'),
  repo: DS.belongsTo('repo')
});
