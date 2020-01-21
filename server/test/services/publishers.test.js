const app = require('../../src/app');

describe('\'publishers\' service', () => {
  it('registered the service', () => {
    const service = app.service('publishers');
    expect(service).toBeTruthy();
  });
});
