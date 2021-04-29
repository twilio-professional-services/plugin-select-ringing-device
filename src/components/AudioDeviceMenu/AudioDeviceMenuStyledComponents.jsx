import { default as styled } from "react-emotion";

import {
  Menu,
  MenuItem,
} from "@twilio/flex-ui";

export const DeviceMenu = styled(Menu)`
  white-space: nowrap;
  min-width: 200px;
  box-shadow: -1px 1px 3px 0 rgba(0, 0, 0, 0.4);
`;

export const DeviceMenuTitle = styled("li")`
  font-size: 12px;
  font-weight: bold;
  padding-top: 4px;
  padding-bottom: 3px;
  padding-left: 12px;
  padding-right: 12px;
  ${props => props.theme.UserActivityControls.Item}
`;

export const DeviceMenuItem = styled(MenuItem)`
  font-weight: normal;
  letter-spacing: initial;
  font-weight: ${props => props.selected && "bold"};
`;