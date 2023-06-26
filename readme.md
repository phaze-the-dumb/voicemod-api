# VoiceMod API

Install:

`npm i voicemod`

Usage:

```js
const VoiceMod = require('voicemod');

let vm = new VoiceMod();

vm.init().then(async () => {
  let user = await vm.getUser();
  console.log(user);

  // Returns user id
})
```