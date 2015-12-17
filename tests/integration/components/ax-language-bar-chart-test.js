import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('ax-language-bar-chart', 'Integration | Component | ax language bar chart', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ax-language-bar-chart}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#ax-language-bar-chart}}
      template block text
    {{/ax-language-bar-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
