import DS from 'ember-data';
import IssueEvent from './issues-event';

export default IssueEvent.extend({
  comment: DS.belongsTo('comment')
});
