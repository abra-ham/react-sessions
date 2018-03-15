import { injectGlobal } from 'styled-components';
import Soberana from './assets/soberanasans-regular-webfont.ttf';

injectGlobal`
  @font-face {
    font-family: 'SoberanaSans';
    src: url('${Soberana}');
  }

  @keyframes ul {
    0% {
      width: 0;
    }
    100% {
      width: calc(100% - 23px);
    }
  }
`;
