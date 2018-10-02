const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

const generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url:`https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt:Date.now()
  };
};

module.exports = {generateMessage, generateLocationMessage};
