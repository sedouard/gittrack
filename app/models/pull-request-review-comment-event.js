import DS from 'ember-data';
import PullRequestEvent from './pull-request-event';
export default PullRequestEvent.extend({
  comment: DS.attr('comment')
});
