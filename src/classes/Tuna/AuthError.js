class AuthError extends Error{
  constructor(message, description){
    super(message);
    this.description = description;
  }
}

module.exports = AuthError;