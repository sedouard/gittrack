import GithubAdapter from './github';
export default GithubAdapter.extend({
  buildURL: function (modelName, id, snapshot, requestType, query) {
    // since ember's json api doesn't really work with .get for hasmany
    // relationships, we have to do this
    var resolvedURL = this._super(modelName, id, snapshot, requestType, query);
    if (query.org) {

      resolvedURL = resolvedURL.replace(this.get('host'), '/orgs/' + query.org);
      resolvedURL = this.get('host') + resolvedURL;

      if (query.page) {
        resolvedURL += '?page=' + query.page;
      }
    }
    return resolvedURL;
  }
});
