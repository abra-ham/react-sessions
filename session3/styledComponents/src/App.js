import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { Nav, Border, MyLink } from './styled';

const getLinks = () => [
  { label: 'Home', url: '/' },
  { label: 'Woof!', url: '/dog' },
  { label: 'Hello!', url: '/hello' },
];

const SingleLink = ({ url, label }) => {
  return (
    <MyLink key={url}>
      <Link to={url}>{label}</Link>
      <Border />
    </MyLink>
  );
};

const LinksList = ({ items }) => {
  return items.map(({ url, label }) => <SingleLink url={url} label={label} />);
};

const LinksContainer = ({ children }) => {
  return <Nav>{children}</Nav>;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '/',
      links: [],
    };
  }

  componentDidMount() {
    this.setState({
      links: getLinks(),
    });
  }

  render() {
    const { links } = this.state;
    return (
      <LinksContainer>
        <LinksList items={links} />
      </LinksContainer>
    );
  }
}

export default App;
