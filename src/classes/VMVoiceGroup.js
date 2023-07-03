const VMVoice = require('./VMVoice.js');

class VMVoiceGroup extends Array{
  constructor(){
    super();
  }

  async processInternalAllVoices( api ){
    let voices = await api.getVoices();

    voices.voices.forEach(voice => {
      let v = new VMVoice();
      v.processInternal(voice, api);

      this.push(v);

      if(v.id === voices.currentVoice)
        api.interface.currentVoice = v;
    })
  }

  processInternalFilter( allVoices, query ){
    let voices = allVoices.filter(v => v[query]);
    voices.forEach(v => this.push(v));
  }
}

module.exports = VMVoiceGroup;