import Ember from 'ember';

export function lookup(params) {
  return params[0][params[1]];
}

export default Ember.Helper.helper(lookup);
