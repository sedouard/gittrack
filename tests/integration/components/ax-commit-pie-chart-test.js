import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('ax-commit-pie-chart', 'Integration | Component | ax commit pie chart', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ax-commit-pie-chart}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#ax-commit-pie-chart}}
      template block text
    {{/ax-commit-pie-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
