import Ember from 'ember';

export function lessThan(params) {
  return params[0] < params[1];
}

export default Ember.Helper.helper(lessThan);
