import styled, { keyframes } from 'styled-components';
import './global';

export const Nav = styled.ul`
  font-family: 'SoberanaSans';
  font-size: 17px;
  list-style: none;
  margin-top: 20px;
  text-align: center;
`;

export const Border = styled.span`
  background: #0088cc;
  bottom: -10px;
  display: block;
  height: 4px;
  left: 10px;
  position: absolute;
  width: calc(100% - 23px);
`;

const animations = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: calc(100% - 23px);
  }
`;

export const MyLink = styled.li`
  display: inline;
  position: relative;

  a {
    color: #333;
    display: inline-block;
    padding: 10px;
    text-decoration: none;
  }

  .selected a {
    color: #0088cc;
  }

  a:hover {
    color: #0088cc;
  }

  a:hover ~ .border {
    animation: ul 0.3s ease-out;
    background: #333;
  }
`;
