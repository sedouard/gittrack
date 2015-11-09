import DS from 'ember-data';

export default DS.Model.extend({
  message: DS.attr('string'),
  sha: DS.attr('string'),
  url: DS.attr('string'),
  author: DS.attr('author'),
  distinct: DS.attr('boolean'),
  commit: DS.belongsTo('commit', {async: true})
});
