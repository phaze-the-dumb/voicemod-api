const crypto = require('crypto');
const fetch = require('node-fetch');
const events = require('events');

const AuthError = require('./AuthError');

let tokens = [];

class TokenStorage {
  constructor(id, token){
    this.id = id;
    this.token = token;

    tokens.push(this);
  }
}

class AuthService extends events.EventEmitter {
  constructor(){
    super();

    this.id = crypto.randomUUID();
    this.state = 0; // 0 - Not logged in, 1 - logged in, 2 - Auth error

    this.version = require('../../../package.json').version;
    this.userAgent = 'NodeJS VoiceMod-API / ' + this.version + ' (https://github.com/phaze-the-dumb/voicemod-api)';

    new TokenStorage(this.id, null);
  }

  login( token, apis ){
    tokens.find(x => x.id === this.id).token = token;

    this.fetch('https://tuna-api.voicemod.net/v1/auth')
      .then(data => data.json())
      .then(async data => {
        if(data.message){
          this.state = 2;
          this.emit('error', new AuthError(data.message, data.description));
        } else{
          this.state = 1;
          for (let i = 0; i < apis.length; i++)
            await apis[i].loginInternal(data);

          this.emit('auth-success')
        }
      })
      .catch(e => {
        this.emit('error', e);
        this.state = 2;
      })
  }

  fetch( url, options = {} ){
    let token = tokens.find(x => x.id === this.id).token;

    let headers = {
      'user-agent': this.userAgent,
      'Authorization': 'Bearer ' + token
    };

    if(options.headers){
      Object.keys(options.headers).forEach(key => {
        headers[key] = options.headers[key];
      });
    }

    return fetch(url, {
      method: options.method || 'GET',
      headers: headers,
      body: options.body
    })
  }
}

module.exports = AuthService;