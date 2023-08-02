const VMImage = require('./VMImage');

class VMSound{
  constructor( sound, api ){
    this.id = sound.id;
    this.name = sound.name;

    this.isCustom = sound.isCustom;
    this.isEnabled = sound.isEnabled;
    this.playbackMode = sound.playbackMode;
    this.loop = sound.loop;

    this.muteOtherSounds = sound.muteOtherSounds;
    this.muteVoice = sound.muteVoice;
    this.stopOtherSounds = sound.stopOtherSounds;
    
    this.internal = {
      bitmapChecksum: sound.bitmapChecksum, // Store this internally for later
      api,
      image: new VMImage()
    }
  }

  updateInternal( sound ){
    this.id = sound.id;
    this.name = sound.name;

    this.isCustom = sound.isCustom;
    this.isEnabled = sound.isEnabled;
    this.playbackMode = sound.playbackMode;
    this.loop = sound.loop;

    this.muteOtherSounds = sound.muteOtherSounds;
    this.muteVoice = sound.muteVoice;
    this.stopOtherSounds = sound.stopOtherSounds;
  }

  play(){
    this.internal.api.playMeme(this.id);
  }

  getImage(){
    return new Promise(async (resolve, reject) => {
      if(!this.internal.image.hasData){
        let res = await this.internal.api.getBitmapMeme(this.id);

        this.internal.image.hasData = true;
        this.internal.image.default = res.result.default;
        this.internal.image.selected = res.result.selected;
        this.internal.image.transparent = res.result.transparent;
      }
      
      resolve(this.internal.image);
    })
  }
}

module.exports = VMSound;