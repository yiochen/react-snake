import React from 'react';
import config from '../config';

export default ({ row, col }) => {
  const style = {
    position: 'absolute',
    display: 'block',
    background: 'yellow',
    width: `${config.pxPerUnit}px`,
    height: `${config.pxPerUnit}px`,
    left: `${col * config.pxPerUnit}px`,
    top: `${row * config.pxPerUnit}px`,
  };
  return <div style={style} />;
};
