import React from 'react';
import { FlexPlugin } from 'flex-plugin';

import AudioDeviceSelector from "./components/AudioDeviceMenu/AudioDeviceSelector";

const PLUGIN_NAME = 'RingDevicePlugin';

export default class RingDevicePlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    const options = {
      sortOrder: 0,
      align: "end"
    };

    let audio = new Audio(
      'https://eggplant-dugong-3887.twil.io/assets/outbound-beep.mp3',
    );

    audio.loop = true;

    flex.MainHeader.Content.add( <
      AudioDeviceSelector key = "audio-device-selector" / > ,
      options
    );

    const resStatus = ["accepted","canceled","rejected","rescinded","timeout"];

    manager.workerClient.on("reservationCreated", function(reservation) {
      if (reservation.task.taskChannelUniqueName === 'voice') {
        manager.voiceClient.audio.ringtoneDevices.get().forEach(device => {
          audio.setSinkId(device.deviceId);
        });

        audio.play();
      };

      resStatus.forEach((e) => {
        reservation.on(e, () => {
          audio.pause()
        });
      });
    });
  }
}
