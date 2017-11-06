import React from 'react';
import config from '../config';

export default ({ row, col }) => {
  const style = {
    position: 'absolute',
    left: `${config.pxPerUnit * col}px`,
    top: `${config.pxPerUnit * row}px`,
    width: `${config.pxPerUnit}px`,
    height: `${config.pxPerUnit}px`,
    background: 'green',

    display: 'block',
  };
  return <div style={style} />;
};
