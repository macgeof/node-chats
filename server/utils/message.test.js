var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toEqual(expect.objectContaining({from, text}));
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let from = 'Admin';
    let link = 'My current location';
    let latitude = 1;
    let longitude = -1;
    let message = generateLocationMessage(from, latitude, longitude);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toEqual(expect.objectContaining({
      from,
      url:`https://www.google.com/maps?q=${latitude},${longitude}`
    }));
  });
});
