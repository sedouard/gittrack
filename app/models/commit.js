import DS from 'ember-data';

export default DS.Model.extend({
  commit: DS.attr('commitData'),
  author: DS.attr('user'),
  stats: DS.attr('commitStats'),
  committer: DS.attr('user'),
  url: DS.attr('string'),
  html_url: DS.attr('string'),
  comments_url: DS.attr('string'),
  parents: DS.hasMany('commitPreview'),
  files: DS.hasMany('file')
});
