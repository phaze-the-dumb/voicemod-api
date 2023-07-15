const TunaVoice = require('./TunaVoice');
const TunaEffect = require('./TunaEffect');


class TunaTextToSpeech{
  constructor( internal ){
    this.internal = internal;
    this.voices = [];
    this.effects = [];
  }

  loginInternal(){
    return new Promise(res => {
      let auth = this.internal.internalAuth;

      auth.fetch('https://labs-proxy.voicemod.net/api/v1/voices?tags=prod')
        .then(data => data.json())
        .then(data => {
          data.voices.forEach(voice =>
            this.voices.push(new TunaVoice(voice.id, voice.name, auth)));

          auth.fetch('https://labs-proxy.voicemod.net/api/v1/dsp-effects')
            .then(data => data.json())
            .then(data => {
              data.forEach(effect =>
                this.effects.push(new TunaEffect(effect.id, effect.name)));

              res();
            })
        })
    })
  }
}

module.exports = TunaTextToSpeech;