const VMImage = require('./VMImage');

class VMVoice{
  constructor(){
    this.id = null;
    this.name = null;
    this.parameters = [];
    
    this.isEnabled = null;
    this.isFavourite = null;
    this.isNew = null;
    this.isCustom = null;
  }

  load(){
    this.internal.api.setVoice(this.id);
  }

  processInternal( voice, api ){
    this.id = voice.id;
    this.name = voice.friendlyName;
    this.parameters = voice.parameters;

    this.isEnabled = voice.enabled || true; // If voice.enabled is false it is most likely the "nofx" voice which every user has access to.
    this.isFavourite = voice.favorited;
    this.isNew = voice.isNew;
    this.isCustom = voice.isCustom;

    this.internal = {
      bitmapChecksum: voice.bitmapChecksum, // Store this internally for later
      api,
      image: new VMImage()
    }
  }

  getImage(){
    return new Promise(async (resolve, reject) => {
      if(!this.internal.image.hasData){
        let res = await this.internal.api.getBitmapVoice(this.id);

        this.internal.image.hasData = true;
        this.internal.image.default = res.result.default;
        this.internal.image.selected = res.result.selected;
        this.internal.image.transparent = res.result.transparent;
      }
      
      resolve(this.internal.image);
    })
  }
}

module.exports = VMVoice;