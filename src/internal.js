const WebSocket = require('ws');
const { randomUUID } = require('crypto');

const VM_PORTS = [ 59129, 20000, 39273, 42152, 43782, 46667, 35679, 37170, 38501, 33952, 30546 ];
const VM_EVENTS = [ 
  'licenseTypeChanged', 'getAllSoundboard', 'getActiveSoundboardProfile', 'getMemes',
  'voiceChangedEvent', 'toggleHearMyVoice', 'toggleVoiceChanger', 'toggleBackground',
  'toggleMuteMic', 'toggleMuteMemeForMe'
];

class VoiceModInternal{
  constructor( interf, promise ){
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
    this.ws = new WebSocket('ws://localhost:'+VM_PORTS[this.currentPort]+'/v1');

    this.ws.onopen = (...args) => this.onOpen(...args);
    this.ws.onmessage = (...args) => this.onMessage(...args);
    this.ws.onerror = (...args) => this.onError(...args);
  }
  sendAction(action, payload){
    let msg = {
      id: this.id,
      action: action,
      payload: payload
    }

    this.ws.send(JSON.stringify(msg));
  }
  sendActionWithCallback(action, payload, callback){
    return new Promise((resolve, reject) => {
      let msg = {
        id: this.id,
        action: action,
        payload: payload
      }

      if(!callback)
        this.cb[action] = resolve;
      else
        this.cb[callback] = resolve;
      
      this.ws.send(JSON.stringify(msg));
    })
  }
  onOpen(){
    this.opened = true;
    this.sendAction('registerClient', { clientKey: 'anyClient' });
  }
  onMessage( msg ){
    let data = JSON.parse(msg.data);

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

    if(this.cb[data.action]){
      this.cb[data.action](data.payload);
      this.cb[data.action] = null;
    }

    if(VM_EVENTS.includes(data.action))
      this.interface.emit(data.action, data.payload);
  }
  onError( err ){
    this.currentPort++;

    if(this.currentPort > VM_PORTS.length - 1)
      throw new Error("Cannot connect to VoiceMod, are you sure it is running?");

    this.connect();
  }
}

module.exports = VoiceModInternal;