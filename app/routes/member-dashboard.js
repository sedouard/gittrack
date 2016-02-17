import OrgDashboard from './org-dashboard';

export default OrgDashboard.extend({
  setupController: function (controller, user) {
    var membersArray = [];

    this._super(controller, user);

    return this.store.find('member', {org: user.id})
    .then(members => {
      members.forEach(member => {
        membersArray.push(member);
      });

      controller.set('members', membersArray);
    });
  }
});
