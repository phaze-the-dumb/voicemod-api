# VoiceMod API

Install:

`npm i voicemod`

Usage:

```js
const VoiceMod = require('voicemod');

let vm = new VoiceMod();

vm.init().then(async () => {
  console.log('UserID: ' + vm.user.id)
})
```

## [Documentation](docs/main.md)

# Internal Methods

**Note: these are mainly for developer reference purposes, but you can access them through vm.internal.APIMETHOD() if you need to**

Methods: 

- `getUser()`: [here](https://control-api.voicemod.net/api-reference/#sub-getuser-operation)
- `getUserLicense()`: [here](https://control-api.voicemod.net/api-reference/#sub-getuserlicense-operation)
- `getRotatoryVoicesRemainingTime()`: [here](https://control-api.voicemod.net/api-reference/#sub-getrotatoryvoicesremainingtime-operation)
- `getVoices()`: [here](https://control-api.voicemod.net/api-reference/#sub-getvoices-operation)
- `getCurrentVoice()`: [here](https://control-api.voicemod.net/api-reference/#sub-getcurrentvoice-operation)
- `getAllSoundboard()`: [here](https://control-api.voicemod.net/api-reference/#sub-getallsoundboard-operation)
- `getMemes()`: [here](https://control-api.voicemod.net/api-reference/#sub-getmemes-operation)
- `getBitmapMeme( id: MemeID )`: [here](https://control-api.voicemod.net/api-reference/#sub-getmemes-operation)
- `getBitmapVoice( id: VoiceID )`: [here](https://control-api.voicemod.net/api-reference/#sub-getmemes-operation)
- `setVoice( id: VoiceID )`: No Return Value
- `selectRandomVoice( mode: RandomVoiceSelectionID )`: No Return Value
- `getHearMyselfStatus()`: [here](https://control-api.voicemod.net/api-reference/#sub-togglehearmyvoice-operation)
- `toggleHearMyVoice()`: [here](https://control-api.voicemod.net/api-reference/#sub-togglehearmyvoice-operation)
- `getVoiceChangerStatus()`: [here](https://control-api.voicemod.net/api-reference/#sub-togglevoicechanger-operation)
- `toggleVoiceChanger()`: [here](https://control-api.voicemod.net/api-reference/#sub-togglevoicechanger-operation)
- `getBackgroundEffectStatus()`: [here](https://control-api.voicemod.net/api-reference/#sub-togglebackground-operation)
- `toggleBackground()`: [here](https://control-api.voicemod.net/api-reference/#sub-togglebackground-operation)
- `getMuteMicStatus()`: [here](https://control-api.voicemod.net/api-reference/#sub-togglemutemic-operation)
- `toggleMuteMic()`: [here](https://control-api.voicemod.net/api-reference/#sub-togglemutemic-operation)
- `setBeepSound( enabled: Boolean )`: No Return Value
- `playMeme( fileName: MemeName )`: No Return Value
- `stopAllMemeSounds()`: No Return Value
- `getMuteMemeForMeStatus()`: [here](https://control-api.voicemod.net/api-reference/#sub-togglemutememeforme-operation)
- `toggleMuteMemeForMe()`: [here](https://control-api.voicemod.net/api-reference/#sub-togglemutememeforme-operation)
- `setCurrentVoiceParameter( paramName: ParameterName, paramValue: ParameterValue )`: [here](https://control-api.voicemod.net/api-reference/#sub-setcurrentvoiceparameter-operation)

Events:
- `licenseTypeChanged`: [here](https://control-api.voicemod.net/api-reference/#sub-licensetypechanged-operation)
- `getAllSoundboard`: [here](https://control-api.voicemod.net/api-reference/#sub-getallsoundboard-operation)
- `getActiveSoundboardProfile`: [here](https://control-api.voicemod.net/api-reference/#sub-getactivesoundboardprofile-operation)
- `getMemes`: [here](https://control-api.voicemod.net/api-reference/#sub-getmemes-operation)
- `voiceLoadedEvent`: [here](https://control-api.voicemod.net/api-reference/#sub-voicechangedevent-operation)
- `toggleHearMyVoice`: [here](https://control-api.voicemod.net/api-reference/#sub-togglehearmyvoice-operation)
- `toggleVoiceChanger`: [here](https://control-api.voicemod.net/api-reference/#sub-togglevoicechanger-operation)
- `toggleBackground`: [here](https://control-api.voicemod.net/api-reference/#sub-togglebackground-operation)
- `toggleMuteMic`: [here](https://control-api.voicemod.net/api-reference/#sub-togglemutemic-operation)
- `toggleMuteMemeForMe`: [here](https://control-api.voicemod.net/api-reference/#sub-togglemutememeforme-operation)
- `voiceParameterUpdated`: No Mention of it in the API reference but it is mentioned [here](https://control-api.voicemod.net/voices/voice-parameters#reacting-the-changes-on-the-ui)

Types: 
- MemeID: ID of the meme sound
- VoiceID: ID of the voice
- RandomVoiceSelectionID: Can be one of `"AllVoices"`, `"FreeVoices"`, `"FavoriteVoices"`, `"CustomVoices"`
- MemeName: Name of the meme
- ParameterName: Name of the voice parameter
- ParameterValue: An object containing: `value: Number`