module.exports = class NotValidIdStatus extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotValidIdError';
  }
};
