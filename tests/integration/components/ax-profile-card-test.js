import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('ax-profile-card', 'Integration | Component | ax profile card', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ax-profile-card}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#ax-profile-card}}
      template block text
    {{/ax-profile-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
