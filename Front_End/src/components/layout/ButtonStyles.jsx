import Button  from '@mui/material/Button';
import styled from 'styled-components';


export const PurpleButton = styled(Button)`
  && {
    background-color: #b3a3f7;
    color: white;
    &:hover {
      background-color: #a389f4;
    }
  }
`;

export const BlueButton = styled(Button)`
  && {
    background-color: #080a43;
    color: #fff;
    &:hover {
      background-color: #0a1e82;
    }
  }
`;

export const LightPurpleButton = styled(Button)`
&& {
background-color:#7f56da;
color:white;
&:hover:{
background-color:#7a1ccb;
}
}`