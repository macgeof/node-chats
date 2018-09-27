const _expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const __from = 'Geof';
    const __text = 'This is test value';
    const __message = generateMessage(__from, __text);
    _expect(__message).toEqual(_expect.objectContaining({from:__from, text:__text}));
    _expect(__message.createdAt).toBeTruthy();
    _expect(typeof __message.createdAt).toBe('number');
  });
});
