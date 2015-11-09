import DS from 'ember-data';
import Event from './event';

export default Event.extend({
  repo: DS.attr('repo'),
  action: DS.attr('string'),
  url: DS.attr('string'),
  assets_url: DS.attr('string'),
  upload_url: DS.attr('string'),
  html_url: DS.attr('string'),
  tag_name: DS.attr('string'),
  target_commitish: DS.attr('string'),
  name: DS.attr('string'),
  draft: DS.attr('boolean'),
  author: DS.attr('user'),
  prerelease: DS.attr('boolean'),
  created_at: DS.attr('string'),
  published_at: DS.attr('string'),
  tarball_url: DS.attr('string'),
  zipball_url: DS.attr('string'),
  body: DS.attr('string'),
  org: DS.attr('user'),
  user: DS.attr('user')
});
