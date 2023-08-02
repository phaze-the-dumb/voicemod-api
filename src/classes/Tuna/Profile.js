const ProfileUpdate = require('./ProfileUpdate');

class TunaProfile{
  constructor( user ){
    this.user = user;
    this.loaded = false;

    this.username = null;
    this.bio = null;

    this.picture = null;
    this.banner = null;

    this.showExplicitContent = false;

    this.social = {
      twitchId: null,
      twitterId: null,
      instagramId: null,
      tiktokId: null,
      youtubeId: null,
      soundcloudId: null,
      personalSite: null
    }
  }

  update(){
    return new ProfileUpdate(this);
  }

  loginInternal( data ){
    this.username = data.name;
    this.bio = data.bio;
    this.picture = data.picture;
    this.banner = data.banner;
    this.social = data.social;
    this.showExplicitContent = data.showExplicitContent;

    this.loaded = true;
  }
}

module.exports = TunaProfile;