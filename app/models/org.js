import DS from 'ember-data';
import User from './user';

export default User.extend({
  members: DS.hasMany('user', {async: true})
});
