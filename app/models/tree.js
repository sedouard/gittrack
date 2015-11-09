import DS from 'ember-data';

export default DS.Model.extend({
  sha: DS.attr('string'),
  url: DS.attr('url')
});
