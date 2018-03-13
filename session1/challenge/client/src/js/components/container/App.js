import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import {
  AppStyled,
  DataContainerStyled,
  DataTileStyled,
  MainDataStyled,
} from './App.styled';
import { TileErrorBoundary, Modal, Portal } from '../presentational';
import { FAKE_DATA, ENDPOINT } from './constants';

const transformKey = text => text.replace(/([a-z](?=[A-Z]))/g, '$1 ');

const DataTile = ({ name, value, loading, active, onClick }) => {
  // TODO: Throw an error if the value is less than 1
  if (value < 1) {
    throw new Error('message Error');
  }

  return (
    <DataTileStyled
      loading={loading}
      active={active}
      onClick={() => !loading && onClick(name)}
    >
      <h3>{loading ? '' : transformKey(name)}</h3>
      <span>{value}</span>
    </DataTileStyled>
  );
};

const DataList = ({ data, loading, onClick, principal }) => {
  const items = loading ? FAKE_DATA : data;
  // TODO: Use the DateTile and return an array for every data

  const keys = Object.keys(items);
  return keys.map(key => {
    return (
      <TileErrorBoundary key={key}>
        <DataTile
          key={key}
          name={key}
          value={items[key]}
          loading={loading}
          active={key === principal}
          onClick={onClick}
        />
      </TileErrorBoundary>
    );
  });
};

const InformationModal = ({ open, onClick, children }) => {
  // TODO: Create a Portal component and wrap a modal
  // Create the portal on the ../presentational/ModalPortal.js file
  const modal = (
    <Modal open={open} onClick={onClick}>
      {children}
    </Modal>
  );

  return <Portal> {modal} </Portal>;
};

class MainTile extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.showModal = this.showModal.bind(this);
  }

  showModal() {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  }

  render() {
    const { data, isLoading, principal } = this.props;
    const { open } = this.state;
    let content;

    if (isLoading) {
      content = 'Loading...';
    } else {
      content = [
        <h2 key={1}>{transformKey(principal)}</h2>,
        <span key={2} onClick={this.showModal}>
          {data[principal]}
        </span>,
      ];
    }

    return <MainDataStyled>{content}</MainDataStyled>;
  }
}

const Information = ({ data, principal, onClick }) => {
  const isLoading = !data;
  const mainContent = isLoading ? 'Loading...' : [, data[principal]];
  const content = (
    <DataList
      data={data}
      loading={isLoading}
      principal={principal}
      onClick={onClick}
    />
  );

  return (
    <DataContainerStyled>
      <MainTile principal={principal} data={data} isLoading={isLoading} />
      {content}
    </DataContainerStyled>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      principal: 'temperature',
    };
    this.updatePrincipal = this.updatePrincipal.bind(this);
  }

  updatePrincipal(value) {
    this.setState(prevState => {
      if (value === prevState.principal) {
        return null;
      }

      return { principal: value };
    });
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  componentDidMount() {
    const socket = socketIOClient(ENDPOINT);

    // TODO: Update the state.date only if the date.temperature is different
    // Use functional state

    socket.on('FromAPI', data => {
      this.setState(state => {
        if (data) {
          return { data: data.data };
        }
        return null;
      });
    });
  }

  render() {
    const { data, principal } = this.state;

    return (
      <AppStyled>
        <Information
          data={data}
          principal={principal}
          onClick={this.updatePrincipal}
        />
      </AppStyled>
    );
  }
}

export default App;
