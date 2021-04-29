# plugin-select-ringing-device

This twilio Flex PlugIn is based on the [select-audio-device PlugIn](https://github.com/jhunter-twilio/plugin-select-audio-device/). The different use case:

> Your agents want to ring a different device than the one they listen to

**Use Case**: The agent takes off their headset when not on a call. When a call comes in, the headset would ring, but the agent doesn't listen. 

Therefore, there is a dropdown menu in the top menu where the agent can pick their ringing device. 

## Screenshot

![Selecting Ringing Device](https://raw.githubusercontent.com/twilio-professional-services/plugin-select-ringing-device/main/screenshot/select.gif)


## Pre-Requirements

You have to have the [Twilio CLI setup](https://www.twilio.com/docs/twilio-cli/quickstart) on your machine.

## Install

1. `git clone git@github.com:twilio-professional-services/plugin-select-ringing-device.git`
2. `cd plugin-select-ringing-device`
3. `npm i`
4. `twilio flex:plugins:start` to start locally, or
5. `twilio flex:plugins:deploy --major --changelog "VERSION" --description "DESCRIPTION"`

## Usage

You can change the sound you want to play by changing the URL in the `RingDevicePlugin.js` file:

```javascript
let audio = new Audio(
  'https://eggplant-dugong-3887.twil.io/assets/outbound-beep.mp3',
);
```