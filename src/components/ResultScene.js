import React from 'react';
import Board from './Board';

const style = {
  position: 'absolute',
  display: 'block',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
};
export default ({ result, onReplay }) => {
  return (
    <Board>
      <div style={style}>
        <span>{result.toUpperCase()}</span>
        <br />
        <button onClick={onReplay}>PLAY AGAIN</button>
      </div>
    </Board>
  );
};
