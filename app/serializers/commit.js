import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  isNewSerializerAPI: true,
  normalizeFindBelongsToResponse: function (store, primaryModelClass, payload) {

    var data = payload;
    data.id = payload.sha;
    data.type = 'commit';

    var linkageObjects = [];
    data.relationships = {};

    data.relationships.commit = {
      data: {
        type: 'commitData',
        id: data.commit.url
      }
    };

    linkageObjects.push({
      id: data.commit.url,
      type: 'commitData',
      attributes: data.commit
    });

    if (data.author) {
      data.relationships.author = {
      data: {
        type: 'user',
        id: data.author.login
      }
      };
      linkageObjects.push({
        type: 'user',
        id: data.committer.login,
        attributes: data.committer
      });
    }

    if (data.committer) {
      data.relationships.committer = {
        data: {
          type: 'user',
          id: data.committer.login,
          attributes: data.committer
        }
      };
      linkageObjects.push({
        type: 'user',
        id: data.committer.login
      });
    }

    data.relationships.parents = {
      data: []
    };

    data.parents.forEach(parent => {
      data.relationships.parents.data.push({
        type: 'commitPreview',
        id: parent.url
      });

      linkageObjects.push({
        type: 'commitPreview',
        id: parent.url,
        attributes: parent
      });
    });

    data.relationships.stats = {
      data: {
        type: 'commitStats',
        id: data.sha
      }
    };
    linkageObjects.push({
      type: 'commitStats',
      id: data.sha,
      attributes: data.stats
    });

    data.attributes = data;

    // return json api spec compatible object
    return {
      data: data,
      included: linkageObjects
    };
  }
});
