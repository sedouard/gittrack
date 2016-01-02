import DS from 'ember-data';
import event from '../serializers/event';
import env from '../config/environment';
export default DS.RESTAdapter.extend({
  host: env.host,
  // Ember Data 2.0 Reload behavior
  serializer: event.create(),
  handleResponse: function (status, headers, payload) {

    payload.meta = {};

    if (headers.link && headers.link.indexOf('rel="next"') > -1) {

      var parts = headers.link.split('rel="next"'),
          next = parts[0].substr(1, parts[0].indexOf('>', 1) - 1),
          last = parts[1].substr(parts[1].indexOf('<', 0) + 1, parts[1].indexOf('>', 1) - 3);
      var pageString = last.substr(last.indexOf('?page='), last.length - '?page='.length);
      var lastPage = parseInt(pageString.split('=')[1]);
      // each page returns 30 events per github api spec
      payload.meta.total = lastPage;
      payload.links = {};
      payload.links.first = null;
      payload.links.next = next;
      payload.links.last = last;
      payload.links.previous = null;
    } else {
      // no links object means there is only 1 page
      payload.meta.total = 1;
    }
    return this._super(status, headers, payload);
  }
});
