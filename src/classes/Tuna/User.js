const TunaProfile = require('./Profile');

class TunaUser{
  constructor( internal ){
    this.internal = internal

    this.id = null;
    this.voicemodAccountID = null;
    this.slug = null;

    this.profile = new TunaProfile(this);

    this.status = null;
    this.type = null;

    this.createdAt = null;
    this.nextNameChange = null;
    this.updatedAt = null;
  }

  loginInternal( data ){
    return new Promise(res => {
      this.id = data.id;
      this.voicemodAccountID = data.voicemodAccountId;
      this.slug = data.slug;

      this.status = data.status;
      this.type = data.type;

      this.createdAt = new Date(data.createdAt);
      this.nextNameChange = new Date(data.nextChangeNameAvailable);
      this.updatedAt = new Date(data.updatedAt);

      this.profile.loginInternal(data.profile);
      res();
    })
  }
}

module.exports = TunaUser;