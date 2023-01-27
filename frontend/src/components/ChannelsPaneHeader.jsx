import React from 'react';
import { Button, Image } from 'react-bootstrap';

import svgCross from '../assets/cross.svg';

const ChannelsPaneHeader = () => (
  <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
    <span>Каналы</span>
    <Button className="p-0 text-primary btn-group-vertical" variant="light">
      <Image src={svgCross} alt="cross" />
      <span className="visually-hidden">+</span>
    </Button>
  </div>
);

export default ChannelsPaneHeader;
