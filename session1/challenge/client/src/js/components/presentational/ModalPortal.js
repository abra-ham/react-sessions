import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalStyled } from './ModalPortal.styled.js';

const Modal = ({ open, onClick, children }) => {
  return (
    <ModalStyled open={open}>
      <div onClick={onClick}>Click to close</div>
      {children}
    </ModalStyled>
  );
};

const Portal = ({ children }) => {
  const nodeToAppend = document.body;
  console.log('children', children, nodeToAppend);
  return createPortal(children, nodeToAppend);
};

export default Portal;
export { Modal };
