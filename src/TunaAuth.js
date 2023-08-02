const fetch = require('node-fetch');
const { EventEmitter } = require('events');

class TunaAuth extends EventEmitter {
  constructor(options){
    super();

    this.email = options.email;
    this.authCodeInternal = null;

    this.sendVerificationEmailInternal()
      .then(() => {
        this.emit('requestCode');
      })
      .catch(err => {
        throw new Error('Unable to send verification email: '+err);
      })
  }

  sendVerificationEmailInternal(){
    return new Promise((reso, rej)=> {
      let payload = JSON.stringify({ email: this.email });

      fetch('https://api.voicemod.net/v1/accounts/users/send-verification-code', {
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': payload.length
        }
      })
        .then(async res => {
          if(res.status === 202)
            reso();
          else
            rej(await res.json());
        })
    })
  }

  verifyCode(code){
    return new Promise((res, rej) => {
      code = parseInt(code);

      if(code.toString().length !== 6 || isNaN(code))
        rej(new Error('Invalid code'));

      let payload = JSON.stringify({
        email: this.email,
        originalClient: 'voicemod',
        source: 'web',
        verificationCode: parseInt(code)
      })

      fetch('https://api.voicemod.net/v1/auth/sign-in-with-email', {
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': payload.length
        }
      })
        .then(data => data.json())
        .then(data => {
          if(!data.code)
            rej(new Error('Invalid code'));

          this.getUserInfoInternal(data.code, res, rej);
        })
        .catch(e => {
          rej(e);
        })
    });
  }

  getUserInfoInternal( code, res, rej ){
    let payload = JSON.stringify({
      client_id: 'e3242556-6075-4d5b-ab9f-6a0ae15468e8',
      client_secret: '!8Fc*2FyC-P9tJ8#X@TEmCkZ',
      code: code,
      grant_type: 'authorization_code'
    })

    fetch('https://api.voicemod.net/v1/oauth/token', {
      method: 'POST',
      body: payload,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length
      }
    })
      .then(data => data.json())
      .then(data => {
        if(!data.access_token)
          rej(new Error('Failed to retrieve token'));

        res(data.access_token);
      })
      .catch(e => {
        rej(e);
      })
  }
}

module.exports = TunaAuth;