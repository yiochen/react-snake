import React from 'react';
import config from '../config';

const boardSizePx = config.boardSize * config.pxPerUnit;
const style = {
  position: 'relative',
  height: `${boardSizePx}px`,
  width: `${boardSizePx}px`,
  background: 'skyblue',
};
export default props => {
  return <div style={style}>{props.children}</div>;
};
