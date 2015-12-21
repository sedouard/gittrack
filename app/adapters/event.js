import event from '../serializers/event';
import GithubAdapter from './github';
export default GithubAdapter.extend({
  serializer: event.create(),
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
