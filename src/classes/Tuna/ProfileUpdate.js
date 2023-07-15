const FormData = require('form-data');

class ProfileUpdate{
  constructor( profile ){
    this.profile = profile;

    this.name = profile.username;
    this.bio = profile.bio;

    this.social = profile.social;

    this.onError = () => {};
    this.onSuccess = () => {};
  }
  setName( name ){
    this.name = name;
    return this;
  }
  setBio( bio ){
    this.bio = bio;
    return this;
  }
  setSocialTwitch( id ){
    this.social.twitchId = id;
    return this;
  }
  setSocialTwitch( id ){
    this.social.twitterId = id;
    return this;
  }
  setSocialInstagram( id ){
    this.social.instagramId = id;
    return this;
  }
  setSocialTiktok( id ){
    this.social.tiktokId = id;
    return this;
  }
  setSocialYoutube( id ){
    this.social.youtubeId = id;
    return this;
  }
  setSocialSoundcloud( id ){
    this.social.soundcloudId = id;
    return this;
  }
  setPersonalSite( site ){
    this.social.personalSite = site;
    return this;
  }
  error(cb){
    this.onError = cb;
    return this;
  }
  success(cb){
    this.onSuccess = cb;
    return this;
  }
  save(){
    if(
      this.name === this.profile.username &&
      this.bio === this.profile.bio &&
      this.social === this.profile.social
    ) return this.onSuccess();

    let data = new FormData();

    data.append('name', this.name);
    data.append('pictureFile', 'null');
    data.append('bannerFile', 'null');
    data.append('deletePicture', 'false');
    data.append('deleteBanner', 'false');
    data.append('bio', this.bio);
    data.append('id', this.profile.user.id);

    data.append('social[twitchId]', this.social.twitchId);
    data.append('social[twitterId]', this.social.twitterId);
    data.append('social[instagramId]', this.social.instagramId);
    data.append('social[tiktokId]', this.social.tiktokId);
    data.append('social[youtubeId]', this.social.youtubeId);
    data.append('social[soundcloudId]', this.social.soundcloudId);
    data.append('social[personalSite]', this.social.personalSite);

    let authApi = this.profile.user.internal.internalAuth;
    if(!authApi)
      throw new Error('No authentication API Class? This shouldn\'t happen');

    authApi.fetch('https://tuna-api.voicemod.net/v1/users/'+this.profile.user.id+'/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data; boundary=' + data.getBoundary(),
        'Content-Length': data.getLengthSync()
      },
      body: data
    })
      .then(async data => {
        if(data.status === 204){
          this.onSuccess();
        } else{
          let d = await data.json();
          this.onError(new Error(d.message));
        }
      })
  }
}

module.exports = ProfileUpdate;