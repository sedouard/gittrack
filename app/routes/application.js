import Ember from 'ember';

export default Ember.Route.extend({
    /**
     * Setup the context menu and Materialize's dumb <select>,
     * then transition to the landing page
     */
    beforeModel: function () {
        this.transitionTo('landing');
    },
});
