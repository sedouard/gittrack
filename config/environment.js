/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'GitTrack',
    environment: environment,
    chartColors: [
      '#0d47a1',
      '#d81b60',
      '#64ffda',
      '#29b6f6',
      '#66bb6a',
      '#d4e157',
      '#ff9800',
      '#69f0ae'
    ],
    // this color is important to be just for the total part of the line graph
    totalChartColor: '#666',
    host: 'http://cache.gittrack.io',
    starsHost: 'http://stars-tracker.gittrack.io',
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
      'script-src': "'self' http://gittrack.io/ http://cdn.gittrack.io http://az416426.vo.msecnd.net 'unsafe-inline' 'unsafe-eval'",
      'font-src': "'self' http://gittrack.io/ fonts.gstatic.com http://cdn.gittrack.io",
      'connect-src': "'self' https://api.github.com/ https://avatars.githubusercontent.com/ http://localhost:3000 http://gittrack.io http://stars-tracker.gittrack.io http://cache.gittrack.io http://cdn.gittrack.io http://dc.services.visualstudio.com/v2/track",
      'img-src': "'self' https://api.github.com/ https://avatars.githubusercontent.com/ http://localhost:3000 http://gittrack.io http://stars-tracker.gittrack.io http://cache.gittrack.io http://cdn.gittrack.io",
      'style-src': "'self' http://gittrack.io/ 'unsafe-inline' fonts.googleapis.com http://cdn.gittrack.io",
      'media-src': "'self' http://gittrack.io/ http://cdn.gittrack.io"
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
