const WebSocket = require('ws');
const { randomUUID } = require('crypto');
const events = require('events');

const VM_PORTS = [ 59129, 20000, 39273, 42152, 43782, 46667, 35679, 37170, 38501, 33952, 30546 ];
const VM_EVENTS = [ 
  'licenseTypeChanged', 'getAllSoundboard', 'getActiveSoundboardProfile', 'getMemes',
  'voiceLoadedEvent', 'toggleHearMyVoice', 'toggleVoiceChanger', 'toggleBackground',
  'toggleMuteMic', 'toggleMuteMemeForMe', 'voiceParameterUpdated'
];

class VoiceModInternal extends events.EventEmitter {
  constructor( interf, promise ){
    super();

    this.interface = interf;
    this.currentPort = 0;
    this.opened = false;
    this.authenticated = false;
    this.id = randomUUID();
    this.cb = {};
    this.promise = promise;

    this.connect();
  }
  connect(){
    this.ws = new WebSocket('ws://'+this.interface.host+':'+VM_PORTS[this.currentPort]+'/v1');

    this.ws.onopen = () => this.onOpen();
    this.ws.onmessage = (...args) => this.onMessage(...args);
    this.ws.onerror = () => this.onError();
  }
  sendAction(action, payload){
    let msg = {
      id: this.id,
      action: action,
      payload: payload
    }

    // console.log(msg); // For verbose logging
    this.ws.send(JSON.stringify(msg));
  }
  sendActionWithCallback(action, payload){
    return new Promise((resolve, reject) => {
      let id = randomUUID();

      let msg = {
        id: id,
        action: action,
        payload: payload
      }

      this.cb[id] = resolve;
      
      // console.log(msg); // For verbose logging
      this.ws.send(JSON.stringify(msg));
    })
  }
  onOpen(){
    this.opened = true;
    this.sendAction('registerClient', { clientKey: this.interface.apiKey });
  }
  onMessage( msg ){
    let data = JSON.parse(msg.data);
    // console.log(data); // For verbose logging

    switch(data.action){
      case 'registerClient':
        if(data.payload.status.code === '200'){
          this.authenticated = true;
          this.promise.res();
          this.interface.loaded = true;
        } else
          throw new Error('Cannot authenticate client');

        break;
    }

    if(this.cb[data.id]){
      this.cb[data.id](data.payload);
      this.cb[data.id] = null;
    }

    if(this.listenerCount(data.action))
      this.emit(data.action, data.payload);
  }
  onError(){
    this.currentPort++;

    if(this.currentPort > VM_PORTS.length - 1)
      throw new Error("Cannot connect to VoiceMod, are you sure it is running?");

    this.connect();
  }
  getUser(){
    return this.sendActionWithCallback('getUser', {});
  }
  getUserLicense(){
    return this.sendActionWithCallback('getUserLicense', {});
  }
  getRotatoryVoicesRemainingTime(){
    return this.sendActionWithCallback('getRotatoryVoicesRemainingTime', {});
  }
  getVoices(){
    return this.sendActionWithCallback('getVoices', {});
  }
  getCurrentVoice(){
    return this.sendActionWithCallback('getCurrentVoice', {});
  }
  getAllSoundboard(){
    return this.sendActionWithCallback('getAllSoundboard', {});
  }
  getMemes(){
    return this.sendActionWithCallback('getMemes', {});
  }
  getBitmapMeme( id ){
    return this.sendActionWithCallback('getBitmap', { memeId: id });
  }
  getBitmapVoice( id ){
    return this.sendActionWithCallback('getBitmap', { voiceID: id });
  }
  setVoice( id ){
    this.sendAction('loadVoice', { voiceID: id });
  }
  selectRandomVoice( type = 'AllVoices' ){
    this.sendAction('selectRandomVoice', { mode: type });
  }
  getHearMyselfStatus(){
    return this.sendActionWithCallback('getHearMyselfStatus', {}, 'toggleHearMyVoice');
  }
  toggleHearMyVoice(){
    return this.sendActionWithCallback('toggleHearMyVoice', {});
  }
  getVoiceChangerStatus(){
    return this.sendActionWithCallback('getVoiceChangerStatus', {}, 'toggleVoiceChanger');
  }
  toggleVoiceChanger(){
    return this.sendActionWithCallback('toggleVoiceChanger', {});
  }
  getBackgroundEffectStatus(){
    return this.sendActionWithCallback('getBackgroundEffectStatus', {}, 'toggleBackground');
  }
  toggleBackground(){
    return this.sendActionWithCallback('toggleBackground', {});
  }
  getMuteMicStatus(){
    return this.sendActionWithCallback('getMuteMicStatus', {}, 'toggleMuteMic');
  }
  toggleMuteMic(){
    return this.sendActionWithCallback('toggleMuteMic', {});
  }
  setBeepSound( enabled ){
    this.sendAction('setBeepSound', { badLanguage: enabled ? 1 : 0 });
  }
  playMeme( fileName ){
    this.sendAction('playMeme', { FileName: fileName, IsKeyDown: true });
  }
  stopAllMemeSounds(){
    this.sendAction('stopAllMemeSounds', {});
  }
  getMuteMemeForMeStatus(){
    return this.sendActionWithCallback('getMuteMemeForMeStatus', {}, 'toggleMuteMemeForMe');
  }
  toggleMuteMemeForMe(){
    return this.sendActionWithCallback('toggleMuteMemeForMe', {});
  }
  setCurrentVoiceParameter( paramName, paramValue = { maxValue: null, minValue: null, displayNormalized: null, value: null } ){
    return this.sendActionWithCallback('setCurrentVoiceParameter', { parameterName: paramName, parameterValue: paramValue });
  }
}

module.exports = VoiceModInternal;