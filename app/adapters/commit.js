import GithubAdapter from './github';
import CommitSerializer from '../serializers/commit';
export default GithubAdapter.extend({
  serializer: CommitSerializer.create(),
    buildURL: function (modelName, id, snapshot, requestType, query) {
    // since ember's json api doesn't really work with .get for hasmany
    // relationships, we have to do this
    var resolvedURL = this._super(modelName, id, snapshot, requestType, query);
    if (query.actorId) {

      resolvedURL = resolvedURL.replace(this.get('host'), '/users/' + query.actorId);
      resolvedURL = this.get('host') + resolvedURL;

      if (query.page) {
        resolvedURL += '?page=' + query.page;
      }
    }
    return resolvedURL;
  }
});
