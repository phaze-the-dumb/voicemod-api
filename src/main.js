const VoiceModInternal = require('./internal');

// Users
const VMUser = require('./classes/VMUser');

// Voices
const VMVoiceGroup = require('./classes/VMVoiceGroup');
const VMVoice = require('./classes/VMVoice');

// Soundboards
const VMSoundBoardGroup = require('./classes/VMSoundBoardGroup');

/* 
REMINDER TO FUTURE PHAZE
- TTS APIS (you can probably reverse it with mitm proxy, since there's no documentation, also huggingface repo?)
*/

class VoiceMod{
  constructor(){
    this.loaded = false;
    this.internal = null;

    // User APIs
    this.user = new VMUser();

    // Voices
    this.voices = new VMVoiceGroup();
    this.favouriteVoices = new VMVoiceGroup();
    this.customVoices = new VMVoiceGroup();
    this.newVoices = new VMVoiceGroup();
    this.enabledVoices = new VMVoiceGroup();

    this.currentVoice = new VMVoice(this);
    this.rotaryVoiceExpires = -1;

    // Soundboards
    this.soundboards = new VMSoundBoardGroup();
  }
  init(){
    return new Promise(( res, rej ) => {
      this.internal = new VoiceModInternal(this, { res: async () => {
        // Users
        await this.user.processInternal(this.internal);

        // Voices
        await this.voices.processInternalAllVoices(this.internal);

        this.favouriteVoices.processInternalFilter(this.voices, 'isFavourite');
        this.customVoices.processInternalFilter(this.voices, 'isCustom');
        this.newVoices.processInternalFilter(this.voices, 'isNew');

        let rotVoiceTime = await this.internal.getRotatoryVoicesRemainingTime();

        if(rotVoiceTime == -1)
          this.rotaryVoiceExpires = -1
        else
          this.rotaryVoiceExpires = Date.now() + rotVoiceTime.remainingTime * 1000;

        this.internal.on('voiceLoadedEvent', ( voice ) => {
          this.currentVoice = this.voices.find(x => x.id === voice.voiceID);
          this.currentVoice.parameters = voice.parameters;
        });

        this.internal.on('voiceParameterUpdated', ( e ) => {
          let voice = this.voices.find(x => x.id === e.voiceId);
          Object.values(voice.parameters).find(x => x.name === e.parameter.name).value = e.parameter.value;
        })
        
        // Soundboards
        await this.soundboards.init( this.internal );

        res();
      }, rej });
    })
  }

  reloadVoices(){
    return new Promise(async (resolve, reject) => {
      await this.voices.processInternalAllVoices(this.internal);

      this.favouriteVoices.processInternalFilter(this.voices, 'isFavourite');
      this.customVoices.processInternalFilter(this.voices, 'isCustom');
      this.newVoices.processInternalFilter(this.voices, 'isNew');

      resolve();
    })
  }

  setVoiceParam(parameter, value){
    this.internal.setCurrentVoiceParameter(parameter, { value });
  }

  stopAllSounds(){
    this.internal.stopAllMemeSounds()
  }
}

module.exports = VoiceMod;