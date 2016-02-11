/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var path = require('path');

module.exports = function(defaults) {
  var staticPathRoot = process.env.STATIC_ASSET_ROOT || '';
  var inlineContent = {
    'GitTrack.js' : {
      content: staticPathRoot + 'assets/GitTrack.js'
    },
    'GitTrack.css' : {
      content: staticPathRoot + 'assets/GitTrack.css'
    },
    'vendor.css' : {
      content: staticPathRoot + 'assets/vendor.css'
    },
    'vendor.js' : {
      content: staticPathRoot + 'assets/vendor.js'
    },
    '2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2': {
      content: staticPathRoot + 'fonts/2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2'
    }
  };

  if (!process.env.ENABLE_TELEMETRY) {
    inlineContent['disable-app-insights'] = './vendor/js/ai-disable.js';
  }

  var app = new EmberApp(defaults, {
    inlineContent: inlineContent
  });

  app.import('./bower_components/materialize/dist/js/materialize.js');
  app.import('./bower_components/color/one-color.js');
  app.import('./bower_components/materialize/dist/font/material-design-icons/Material-Design-Icons.eot', {
      destDir: 'fonts'
  });
  app.import('./bower_components/materialize/dist/font/material-design-icons/Material-Design-Icons.svg', {
      destDir: 'fonts'
  });
  app.import('./bower_components/materialize/dist/font/material-design-icons/Material-Design-Icons.ttf', {
      destDir: 'fonts'
  });
  app.import('./bower_components/materialize/dist/font/material-design-icons/Material-Design-Icons.woff', {
      destDir: 'fonts'
  });
  app.import('./bower_components/materialize/dist/font/material-design-icons/Material-Design-Icons.woff2', {
      destDir: 'fonts'
  });
  app.import('./vendor/fonts/2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2', {
      destDir: 'fonts'
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
