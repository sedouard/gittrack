import GithubAdapter from './github';
export default GithubAdapter.extend({
  pathForType: function () {
    return 'events';
  }
});
