import { moduleForModel, test } from 'ember-qunit';

moduleForModel('commit-preview', 'Unit | Model | commit preview', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
