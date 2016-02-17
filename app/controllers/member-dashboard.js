import OrgDashboard from './org-dashboard';
import Ember from 'ember';
export default OrgDashboard.extend({
  memberObserver: Ember.observer('members', () => {
    Ember.run.scheduleOnce('afterRender', () => {
      Ember.$(document).ready( () => {
        Ember.$('.scrollspy').scrollSpy({ target: '.spy-active' });
        Ember.$('.tooltipped').tooltip({ delay: 50 });
      });
    });
  })
});
