import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
const LI = styled.li`
  background: lightblue;
  margin: 0 0 2px 0;
  padding: 15px 10px;
  cursor: pointer;
  text-transform: capitalize;
  transition: all 0.5s;
  &:hover {
    background: red;
    color: white;
    opacity: 0.8;
  }
  ${({ active }) => {
    if (active) {
      return `
        background: red;
        color: white;
      `;
    }
  }};
`;

const MenuItem = ({ onClick, children, active }) => (
  <NavLink activeClassName="active" to={children}>
    <LI onClick={onClick} active={children === active}>
      {children}
    </LI>
  </NavLink>
);

export default MenuItem;
