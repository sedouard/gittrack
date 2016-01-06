module.exports = function (app, server) {
  app.use(require('prerender-node'));
  return app;
}
