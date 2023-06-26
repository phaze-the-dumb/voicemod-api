const VoiceModInternal = require('./internal');
const events = require('events');

class VoiceMod extends events.EventEmitter {
  constructor(){
    super();

    this.loaded = false;
    this.internal = null;
  }
  init(){
    return new Promise(( res, rej ) => {
      this.internal = new VoiceModInternal(this, { res, rej });
    })
  }
  getUser(){
    return this.internal.sendActionWithCallback('getUser', {});
  }
  getUserLicense(){
    return this.internal.sendActionWithCallback('getUserLicense', {});
  }
  getRotatoryVoicesRemainingTime(){
    return this.internal.sendActionWithCallback('getRotatoryVoicesRemainingTime', {});
  }
  getVoices(){
    return this.internal.sendActionWithCallback('getVoices', {});
  }
  getCurrentVoice(){
    return this.internal.sendActionWithCallback('getCurrentVoice', {});
  }
  getAllSoundboard(){
    return this.internal.sendActionWithCallback('getAllSoundboard', {});
  }
  getMemes(){
    return this.internal.sendActionWithCallback('getMemes', {});
  }
  getBitmapMeme( id ){
    return this.internal.sendActionWithCallback('getBitmap', { memeId: id });
  }
  getBitmapVoice( id ){
    return this.internal.sendActionWithCallback('getBitmap', { voiceID: id });
  }
  setVoice( id ){
    this.internal.sendAction('loadVoice', { voiceID: id });
  }
  selectRandomVoice( type = 'AllVoices' ){
    this.internal.sendAction('selectRandomVoice', { mode: type });
  }
  getHearMyselfStatus(){
    return this.internal.sendActionWithCallback('getHearMyselfStatus', {}, 'toggleHearMyVoice');
  }
  toggleHearMyVoice(){
    return this.internal.sendActionWithCallback('toggleHearMyVoice', {});
  }
  getVoiceChangerStatus(){
    return this.internal.sendActionWithCallback('getVoiceChangerStatus', {}, 'toggleVoiceChanger');
  }
  toggleVoiceChanger(){
    return this.internal.sendActionWithCallback('toggleVoiceChanger', {});
  }
  getBackgroundEffectStatus(){
    return this.internal.sendActionWithCallback('getBackgroundEffectStatus', {}, 'toggleBackground');
  }
  toggleBackground(){
    return this.internal.sendActionWithCallback('toggleBackground', {});
  }
  getMuteMicStatus(){
    return this.internal.sendActionWithCallback('getMuteMicStatus', {}, 'toggleMuteMic');
  }
  toggleMuteMic(){
    return this.internal.sendActionWithCallback('toggleMuteMic', {});
  }
  setBeepSound( enabled ){
    this.internal.sendAction('setBeepSound', { badLanguage: enabled ? 1 : 0 });
  }
  playMeme( fileName ){
    this.internal.sendAction('playMeme', { FileName: fileName });
  }
  stopAllMemeSounds(){
    this.internal.sendAction('stopAllMemeSounds', {});
  }
  getMuteMemeForMeStatus(){
    return this.internal.sendActionWithCallback('getMuteMemeForMeStatus', {}, 'toggleMuteMemeForMe');
  }
  toggleMuteMemeForMe(){
    return this.internal.sendActionWithCallback('toggleMuteMemeForMe', {});
  }
  setCurrentVoiceParameter( paramName, paramValue = { maxValue: null, minValue: null, displayNormalized: null, value: null } ){
    return this.internal.sendActionWithCallback('setCurrentVoiceParameter', { parameterName: paramName, parameterValue: paramValue });
  }
}

module.exports = VoiceMod;