import DS from 'ember-data';
import Ember from 'ember';
import env from '../config/environment';
export default DS.RESTSerializer.extend({
  isNewSerializerAPI: true,
  normalizeFindRecordResponse: function (store, primaryModelClass, payload) {
    if (primaryModelClass.modelName ==='user') {
      payload.id = payload.login;
      // tiny hack to get the followers link at github.com
      payload.followers_html = payload.followers_url.replace('api.', '').replace('/users','');
    }
    // temporary
    payload.url = payload.url.replace('https://api.github.com', env.host);
    payload = {
      data: {
        type: primaryModelClass.modelName,
        id: payload.login,
        attributes: payload,
        relationships: {
          events: {
            links: {
              related: payload.url + '/events'
            }
          }
        }
      },
      links: {
        self: payload.url
      }
    };

    return payload;
  },
  normalizeQueryResponse: function (store, primaryModelClass, payload) {
    payload = {
      data: payload,
      links: payload.links,
      meta: payload.meta
    };

    if (primaryModelClass.modelName === 'event') {
      var linkage = this.normalizeEvent(payload);
      payload.included = linkage;
    }

    Ember.Logger.debug(payload);
    return payload;
  },
  // Performs normalizing data for any general github event object
  normalizeEvent: function (payload) {
    var linkageObjects = [];
    payload.data.forEach( data => {
      if (data.type) {
        var firstChar = data.type[0];
        firstChar = firstChar.toLowerCase();
        data.type = firstChar + data.type.substring(1, data.type.length);
      }

      // bring all the data.payload into the root data object
      for (let payloadKey in data.payload) {
        data[payloadKey] = data.payload[payloadKey];
      }

      // get rid of payload object now
      delete data.payload;
      data.relationships = {};

      // somtimes repos only have name and not full_name
      data.repo.full_name = data.repo.full_name || data.repo.name;
      data.attributes = data;
      data.actor.type = 'user';
      data.repo.type = 'repo';

      data.actor.attributes = data.actor;
      data.repo.attributes = data.repo;

      linkageObjects.push(data.actor);
      linkageObjects.push(data.repo);
      var linkage;
      switch (data.type) {
        case 'pullRequestEvent':
          linkage = this.normalizePullRequestEvent(data);
          linkageObjects = linkageObjects.concat(linkage);
          break;
        case 'pushEvent':
          linkage = this.normalizePushEvent(data);
          linkageObjects = linkageObjects.concat(linkage);
          break;
        case 'createEvent':
          linkage = this.normalizeCreateEvent(data);
          linkageObjects = linkageObjects.concat(linkage);
          break;
        case 'issuesEvent':
          linkage = this.normalizeIssuesEvent(data);
          linkageObjects = linkageObjects.concat(linkage);
          break;
        case 'issueCommentEvent':
          linkage = this.normalizeIssuesEvent(data);
          linkage = linkage.concat(this.normalizeIssueCommentEvent(data));
          linkageObjects = linkageObjects.concat(linkage);
          break;
        case 'pullRequestReviewCommentEvent':
          linkage = this.normalizePullRequestEvent(data);
          linkage = linkage.concat(this.normalizePRReviewComment(data));
          linkageObjects = linkageObjects.concat(linkage);
          break;
        case 'forkEvent':
          linkage = this.normalizeForkEvent(data);
          linkageObjects = linkageObjects.concat(linkage);
          break;
        case 'releaseEvent':
          linkage = this.normalizeReleaseEvent(data);
          linkageObjects = linkageObjects.concat(linkage);
          break;
        case 'publicEvent':
          // todo: implement
          break;
        case 'commitCommentEvent':
          // todo: implement
          break;
        case 'watchEvent':
          break;
      }

      data.relationships.actor = {
        data: { type: data.actor.type, id: data.actor.id }
      };
      data.relationships.repo = {
        data: { type: data.repo.type, id: data.repo.id }
      };
    });

    return linkageObjects;
  },
  normalizeForkEvent: function (data) {
    var linkageObjects = [];

    data.relationships.forkee = {
      data: {
        type: 'repo',
        id: data.forkee.id
      }
    };
    linkageObjects.push({
      type: 'repo',
      id: data.forkee.id,
      attributes: data.forkee
    });

    return linkageObjects;
  },
  // Normalizes pull-request specific data
  normalizePullRequestEvent: function (data) {

      // bring all the data.payload.pull_request into the root data object
      for (let payloadKey in data.pull_request) {
        data[payloadKey] = data.pull_request[payloadKey];
      }

      var linkageObjects = [];
      for (let key in data) {
        let field = data[key];

        if (field && key === 'base' || key === 'head') {
          field.attributes = field;
          field.type = 'prTip';
          field.id = field.sha;
          field.relationships = {};

          // process user object
          field.user.attributes = field.user;
          field.user.type = 'user';
          field.relationships.user = {
            data: { type: field.user.type, id: field.user.id }
          };
          linkageObjects.push(field.user);

          field.repo.attributes = field.repo;
          field.repo.type = 'repo';
          field.relationships.repo = {
            data: { type: field.repo.type, id: field.repo.id }
          };
          linkageObjects.push(field.repo);

          data.relationships[key] = {
            data: { type: field.type, id: field.id }
          };
          linkageObjects.push(field);
        }
        else if (field && key === 'actor') {
          field.attributes = field;
          field.type = 'user';
          data.relationships[key] = {
            data: { type: field.type, id: field.id }
          };
          linkageObjects.push(field);
        }
        else if (field && key === 'repo') {
          field.attributes = field;
          field.type = 'repo';
          data.relationships[key] = {
            data: { type: field.type, id: field.id }
          };
          linkageObjects.push(field);
        }
      }

      data.attributes = data;

      return linkageObjects;
  },
  normalizePushEvent: function (data) {
    var linkageObjects = [];

    data.attributes = data;
    data.actor.type = 'user';
    data.repo.type = 'repo';

    data.relationships.commits = {
      data: []
    };

    // process commit collection
    data.commits.forEach(preview => {
      preview.url = preview.url.replace('https://api.github.com', env.host);
      preview.type = 'commitPreview';
      preview.id = preview.sha;
      preview.attributes = preview;
      preview.relationships = {};
      preview.relationships.commit = {
        links: {
          related: preview.url
        }
      };
      linkageObjects.push(preview);
      data.relationships.commits.data.push({
        type: preview.type, id: preview.id
      });
    });

    return linkageObjects;

  },
  normalizeCreateEvent: function () {
    var linkageObjects = [];

    return linkageObjects;
  },
  normalizeIssuesEvent: function (data) {
    var linkageObjects = [];

    // bring all the data.payload.issue into the root data object
    for (let payloadKey in data.issue) {
      data[payloadKey] = data.issue[payloadKey];
    }

    data.relationships.user = {
      data: {
        type: 'user',
        id: data.user.login
      }
    };
    linkageObjects.push({
      type: 'user',
      id: data.user.login,
      attributes: data.user
    });
    data.relationships.labels = {
      data: []
    };

    data.labels.forEach(label => {
      data.relationships.labels.data.push({
        type: 'label',
        id: label.name
      });
      linkageObjects.push({
        type: 'label',
        id: label.name,
        attributes: label
      });
    });

    if (data.org) {
      // org
      data.relationships.org = {
        data: {
          id: data.org.login,
          type: 'user'
        }
      };
      linkageObjects.push({
        id: data.org.login,
        type: 'user',
        attributes: data.org
      });
    }

    if (!data.issue.milestone) {
      return linkageObjects;
    }

    // milestone
    data.relationships.milestone = {
      data: {
        id: data.issue.milestone.id,
        type: 'milestone'
      }
    };
    linkageObjects.push({
      id: data.issue.milestone.id,
      type: 'milestone',
      attributes: data.issue.milestone,
      relationships: {
        creator: {
          data: {
            id: data.issue.milestone.creator.login,
            type: 'user'
          }
        }
      }
    });
    linkageObjects.push({
      id: data.issue.milestone.creator.login,
      type: 'user',
      attributes: data.issue.milestone.creator
    });

    return linkageObjects;
  },
  normalizeIssueCommentEvent: function (data) {
    var linkageObjects = [];
    // we've already done most things for
    // processing an issue related event. Just
    // need the comment
    data.relationships.comment = {
      data: {
        type: 'comment',
        id: data.comment.id
      }
    };

    linkageObjects.push({
      type: 'comment',
      id: data.comment.id,
      attributes: data.comment
    });

    return linkageObjects;
  },
  normalizePRReviewComment: function (data) {
    var linkageObjects = [];

    // we've already done most things for
    // processing an issue-related event. Just
    // need the comment
    data.relationships.comment = {
      data: {
        type: 'prComment',
        id: data.comment.id
      }
    };

    linkageObjects.push({
      type: 'prComment',
      id: data.comment.id,
      attributes: data.comment
    });

    return linkageObjects;
  },
  normalizeReleaseEvent: function (data) {
    var linkageObjects = [];

    // bring all the data.payload.pull_request into the root data object
    for (let payloadKey in data.release) {
      data[payloadKey] = data.release[payloadKey];
    }

    data.relationships.author = {
      data: {
        id: data.author.login,
        type: 'user'
      }
    };
    linkageObjects.push({
        id: data.author.login,
        type: 'user',
        attributes: data.author
    });

    return linkageObjects;
  }
});
