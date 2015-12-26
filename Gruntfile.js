var grunt = require('grunt');
require('load-grunt-tasks')(grunt);

var files = ['modules/**/*.js', 'public/javascripts/**/*.js', 'routes/**/*.js', 'test/**/*.js'];

grunt.initConfig({

  'azure-cdn-deploy': {
    'deploy-to-azure': {
        options: {
            containerName: 'gittrack', // container name in blob
            folder: '', // path within container
            zip: true, // gzip files if they become smaller after zipping, content-encoding header will change if file is zipped
            deleteExistingBlobs: false, // true means recursively deleting anything under folder
            concurrentUploadThreads: 10, // number of concurrent uploads, choose best for your network condition
            metadata: {
                cacheControl: 'public, max-age=31530000', // cache in browser
                cacheControlHeader: 'public, max-age=31530000' // cache in azure CDN. As this data does not change, we set it to 1 year
            },
            testRun: false // test run - means no blobs will be actually deleted or uploaded, see log messages for details
        },
        src: [
            'dist/**/*.{js,css,eot,svg,ttf,woff,woff2}'
        ],
        cwd: './'
    }
  }
});
grunt.registerTask('deploy', ['azure-cdn-deploy:deploy-to-azure']);

