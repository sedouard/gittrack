import Ember from 'ember';
import config from '../config/environment';
export default Ember.Component.extend({
  commitsLoading: false,
  maxContributedRepo: null,
  loadingData: Ember.computed.or('commitsLoading', 'loading'),
  isEmpty: function () {
    return !this.get('pieChartData');
  }.property('pieChartData'),

  pieChartData: function () {

    var dataDict = {};
    var color = 0;
    var maxContributedRepo = null;
    var commits = this.get('commits');
    if (commits.get('length') === 0) {
      return;
    }

    commits.forEach(commit => {

      if (!dataDict[commit.get('repo.name')]) {
        dataDict[commit.get('repo.name')] = {
          label: commit.get('repo.name'),
          value: commit.get('stats.total'),
          color: config.chartColors[color]
        };
        color++;
      }
      var total = commit.get('stats.total');
      dataDict[commit.get('repo.name')].value += total;
      if (!maxContributedRepo || maxContributedRepo.value <
        dataDict[commit.get('repo.name')].value) {
        maxContributedRepo = {
          repo: commit.get('repo'),
          html_url: commit.get('repo.html_url'),
          value: dataDict[commit.get('repo.name')].value
        };
        this.set('maxContributedRepo', maxContributedRepo);
      }

    });

    var data = [];
    for (var key in dataDict) {
      data.push(dataDict[key]);
    }
    Ember.Logger.debug('Chart Data:');
    Ember.Logger.debug(data);
    return data;
  }.property('commits')
});
