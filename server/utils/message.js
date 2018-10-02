const generateMessage = (__from, __text, __id, __isAcknowledgement = false) => {
  return {
    from:__from,
    text:__text,
    id:__id,
    message:'This is from the server.',
    isAcknowledgement:__isAcknowledgement,
    createdAt:Date.now()
  };
};


module.exports = {
  generateMessage
}
