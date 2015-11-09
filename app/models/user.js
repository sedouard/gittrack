import DS from 'ember-data';

export default DS.Model.extend({
  login: DS.attr('string'),
  name: DS.attr('string'),
  hireable: DS.attr('boolean'),
  html_url: DS.attr('strine'),
  location: DS.attr('string'),
  avatar_url: DS.attr('string'),
  blog: DS.attr('string'),
  followers: DS.attr('string'),
  followers_url: DS.attr('string'),
  followers_html: DS.attr('string'),
  company: DS.attr('string'),
  organizations_url: DS.attr('string'),
  public_gists: 20,
  public_repos: 93,
  received_events_url: DS.attr('string'),
  repos_url: DS.attr('string'),
  site_admin: DS.attr('boolean'),
  starred_url: DS.attr('string'),
  subscriptions_url: DS.attr('string'),
  type: DS.attr('string'),
  updated_at: DS.attr('date'),
  url: DS.attr('string'),
  events: DS.hasMany('event', { async: true })
});
