import DS from 'ember-data';

export default DS.Model.extend({
  author: DS.attr('author'),
  committer: DS.attr('author'),
  message: DS.attr('string'),
  tree: DS.attr('tree'),
  url: DS.attr('string'),
  commentCount: DS.attr('number')
});
