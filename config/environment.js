/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ghtacker',
    environment: environment,
    chartColors: [
      '#42a5f5',
      '#26a69a',
      '#26c6da',
      '#29b6f6',
      '#66bb6a',
      '#d4e157'
    ],
    host: 'http://cache.gittrack.io',
    baseURL: '/',
    locationType: 'history',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' http://gittrack.io/ 'unsafe-eval'",
      'font-src': "'self' http://gittrack.io/ fonts.gstatic.com",
      'connect-src': "'self' https://api.github.com/ https://avatars.githubusercontent.com/ http://localhost:3000 http://gittrack.io http://cache.gittrack.io",
      'img-src': "'self' https://api.github.com/ https://avatars.githubusercontent.com/ http://localhost:3000 http://gittrack.io http://cache.gittrack.io",
      'style-src': "'self' http://gittrack.io/ 'unsafe-inline' fonts.googleapis.com",
      'media-src': "'self' http://gittrack.io/"
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    sassOptions: {
      includePaths: ['bower_components/materialize/sass']
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
