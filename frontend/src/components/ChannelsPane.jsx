import React from 'react';
import { Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Channel from './Channel';

const Header = () => (
  <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
    <span>Каналы</span>
    <button type="button" className="p-0 text-primary btn btn-group-vertical">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
      </svg>
      <span className="visually-hidden">+</span>
    </button>
  </div>
);

const Navigation = () => {
  const channels = useSelector((state) => state.channelsReducer.channels);
  return (
    <Nav className="px-2">
      {channels.map(({ id, name, removable }) => (
        <Channel
          key={id}
          id={id}
          name={name}
          removable={removable}
        />
      ))}
    </Nav>
  );
};

const ChannelsPane = ({ children }) => (children);

ChannelsPane.Header = Header;
ChannelsPane.Navigation = Navigation;

export default ChannelsPane;
