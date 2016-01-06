import Ember from 'ember';

export default Ember.Component.extend({
    content: null,

    selectedValue: Ember.computed.alias('value'),
    displayValue: '',
    targetProperty: '',
    didInitAttrs() {
        this._super(...arguments);
        var content = this.get('content');

        if (!content) {
            this.set('content', []);
        }
    },
    selectedValueObserver: Ember.observer('selectedValue', function () {
      const valuePath = this.get('valuePath');
      var selectedObject;

      this.get('content').forEach(obj => {
        if (obj[valuePath] === this.get('selectedValue')) {
          selectedObject = obj;
        }
      });

      if (!selectedObject) {
        return;
      }

      var targetEl = this.$('.' + this.get('name') + ' option[value="' + selectedObject[valuePath] + '"]');

      if (targetEl) {
        targetEl.attr('selected','selected');
      }
    }),
    actions: {
        change() {
            const selectedEl = this.$('select')[0];
            const selectedIndex = selectedEl.selectedIndex;
            const valuePath = this.get('valuePath');
            const content = this.get('content');
            const selectedValue = content[selectedIndex][valuePath];

            this.set('selectedValue', content[selectedIndex]);
            this.set('value', content[selectedIndex]);
            // send action to target
            this.get('target').send(this.get('action'), selectedValue);
        }
    }
});
