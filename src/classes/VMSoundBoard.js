const VMSound = require('./VMSound');

class VMSoundBoard extends Array{
  constructor( soundboard, api ){
    super();

    this.id = soundboard.id;
    this.name = soundboard.name;
    this.isCustom = soundboard.isCustom;
    this.isEnabled = soundboard.isEnabled;

    this.internalAPI = api;

    soundboard.sounds.forEach(sound => {
      this.push(new VMSound(sound, api));
    })
  }
  updateInternal( soundboard ){
    this.id = soundboard.id;
    this.name = soundboard.name;
    this.isCustom = soundboard.isCustom;
    this.isEnabled = soundboard.isEnabled;

    this.forEach(sound => {
      let s = soundboard.sounds.find(x => x.id === sound.id);

      if(!s)
        this.removeInternal(sound.id);
    })

    soundboard.sounds.forEach(sound => {
      let s = this.find(x => x.id === sound.id);

      if(!s)
        return this.push(new VMSound(sound, this.internalAPI));

      s.updateInternal(sound);
    })
  }

  get( i ){
    return this[i];
  }

  removeInternal( id ){
    let elementToRemove = this.indexOf(this.find(x => x.id === id));

    for(let i = elementToRemove; i < this.length; i++)
      this[i] = this[i + 1];

    this.length = this.length - 1;
  }
}

module.exports = VMSoundBoard;