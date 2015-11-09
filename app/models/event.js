import DS from 'ember-data';

export default DS.Model.extend({
  actor: DS.belongsTo('user'),
  repo: DS.belongsTo('repo'),
  public: DS.attr('boolean'),
  type: DS.attr('string'),
  created_at: DS.attr('date')
});
