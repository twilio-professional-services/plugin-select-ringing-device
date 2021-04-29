import React from "react";

import {
  withTheme,
  ModalPopupWithEntryControl, Manager, ThumbsUpOrDownItem
} from "@twilio/flex-ui";
import Button from "@material-ui/core/Button";
import { DeviceMenu, DeviceMenuTitle, DeviceMenuItem } from "./AudioDeviceMenuStyledComponents";

class AudioDeviceMenu extends React.Component {

  state = {
    devices: [],
    selectedDevice: '',
  }

  modalPopupRef = React.createRef();

  componentDidMount() {
    let { voiceClient } = Manager.getInstance()
    this.refreshDevices();
    navigator.mediaDevices.addEventListener('devicechange', this.refreshDevices.bind(this));

    voiceClient.audio.ringtoneDevices.set('default');
    this.setState({selectedDevice: 'default'});
  }

  componentWillUnmount() {
    navigator.mediaDevices.removeEventListener('devicechange', this.refreshDevices.bind(this));
  }

  refreshDevices() {
    navigator.mediaDevices.enumerateDevices()
      .then(foundDevices => {
        this.setState({ devices: foundDevices });
      })
  }

  selectMenuItem = (selectedDevice) => {
    let { devices } = this.state;
    let { voiceClient } = Manager.getInstance()

    voiceClient.audio.ringtoneDevices.set(selectedDevice.deviceId);
    this.setState({selectedDevice: selectedDevice.deviceId});

    this.modalPopupRef.current.hide();
  };


  render() {
    let { theme } = this.props;
    return (
      <ModalPopupWithEntryControl
        alignRight
        autoClose
        ref={this.modalPopupRef}
        entryControl={
          <Button color="inherit" lighthover="true">ringing device</Button>
        }>
        <DeviceMenu styleOverride={theme.UserActivityControls}>
          <DeviceMenuTitle>Select Device</DeviceMenuTitle>
          {this.state.devices.map(item => {
            if (item.kind === "audiooutput") {
              return (
                <DeviceMenuItem
                  styleOverride={theme.UserActivityControls}
                  onClick={this.selectMenuItem.bind(this, item)}
                  key={item.deviceId}
                  value={item.deviceId}
                  selected={item.deviceId == this.state.selectedDevice ? true : false}
                >{item.label}</DeviceMenuItem>)
            }
          })}
        </DeviceMenu>
      </ModalPopupWithEntryControl>
    );
  }
}

export default withTheme(AudioDeviceMenu);