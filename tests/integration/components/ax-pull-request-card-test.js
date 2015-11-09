import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('ax-pull-request-card', 'Integration | Component | ax pull request card', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ax-pull-request-card}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#ax-pull-request-card}}
      template block text
    {{/ax-pull-request-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
