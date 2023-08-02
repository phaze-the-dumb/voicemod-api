const events = require('events');

// Authentication Service
const TunaAuth = require('./classes/Tuna/Auth');

// User API
const TunaUser = require('./classes/Tuna/User');

// Text To Speech API
const TunaTextToSpeech = require('./classes/Tuna/TextToSpeech');

/*
  Might do more with this eventually.

  Currently its just used for:
  - Text To Speech API
  - Editing User Profiles
*/

class TunaAPI extends events.EventEmitter{
  constructor(){
    super();

    this.tts = new TunaTextToSpeech(this);
    this.user = new TunaUser(this);
    this.internalAuth = new TunaAuth();

    this.internalAuth.on('auth-success', () => this.emit('login'));
    this.internalAuth.on('error', ( err ) => { throw err });
  }

  login( token ){
    this.internalAuth.login(token, [ this.user, this.tts ]);
  }
}

module.exports = TunaAPI;