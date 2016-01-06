module.exports = {
  // The port that prerender runs on (Phantom will use additional ports)
  port: 3000,

  // Process number (starting from 0) which is added to the above port, used when running multiple instances
  processNum: 0,

  // Can be: jsdom, phantom, or webdriver
  engine: "phantom",

  // Milliseconds to wait after the page load but before getting the HTML
  contentReadyDelay: 0,

  // Maximum milliseconds to wait before the initial app load times out
  initializeTimeout: 25000,

  // Maximum milliseconds to wait before a render job times out
  renderTimeout: 15000,

  // Maximum number of requests a worker can handle before it's restarted
  maxRequestsPerRenderer: 200,

  // Whether to restart a renderer gracefully or exit the process after reaching maxRequestsPerRenderer
  // Note: Exiting the process and having something like supervisor automatically restart it can
  //       help avoid memory leaks which seems to affect the JSDOM engine
  //       This could be investigated with: https://github.com/lloyd/node-memwatch
  exitAfterMaxRequests: false,

  // If exitAfterMaxRequets is true, setting this to true will cause all
  // queued requests to be rendered before the process is terminated
  gracefulExit: true,

  // Maximum number of rendering requests to queue up before dropping new ones
  maxQueueSize: 1000,

  // Your app's default URL
  appUrl: "http://gittrack.io",

  // Serve static files
  serveFiles: true,

  // Log requests for static files
  serveFilesLog: true,

  // Regular expression of static file patterns
  filesMatch: /\.(?:css|js|jpg|png|gif|ico|svg|woff|woff2|ttf|swf|map)(?:\?|$)/,

  // Regular expression containing assets you don't want to download or process
  ignoreAssets: /google-analytics\.com|fonts\.googleapis\.com|typekit\.com|platform\.twitter\.com|connect\.facebook\.net|apis\.google\.com|\.css(?:\?|$)/,

  logging: {
    // Logging verbosity
    "level": "debug",

    // Add a timestamp to logs
    "timestamp": true,

    // Add color formatting to logs
    "format": true
  },

  // Available plugins:
  plugins: [
    "removeScriptTags",
    "httpHeaders",
    //"prepareEmail",
    //"prettyPrintHtml",
    //"minifyHtml",
    //"inMemoryHtmlCache",
    //"s3HtmlCache",
    //require('./your-own-plugin.js')
  ]
}
