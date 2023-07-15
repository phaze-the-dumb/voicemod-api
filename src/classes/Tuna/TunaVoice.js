class TunaVoice{
  constructor(id, name, auth){
    this.internalAuth = auth;
    this.id = id;
    this.name = name;
  }

  text( textToSpeak, effect ){
    return new Promise(res => {
      let body = {
        text: textToSpeak,
        voiceId: this.id
      }

      if(effect)
        body.dsp = effect.id;

      this.internalAuth.fetch('https://labs-proxy.voicemod.net/api/v1/tts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(data => data.json())
        .then(data => {
          res(data);
        })
    })
  }
}

module.exports = TunaVoice;