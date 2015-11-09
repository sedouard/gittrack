import Ember from 'ember';

export default Ember.Component.extend({
  ghTrackUrl: function () {
    Ember.Logger.debug('navbar: user =' + this.get('user'));
    return 'gittrack.io/' + this.get('user.id');
  }.property('user')
});
