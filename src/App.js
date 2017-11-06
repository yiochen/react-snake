import React, { Component } from 'react';
import last from 'lodash/last';
import isEqual from 'lodash/isEqual';
import Board from './components/Board';
import SnakeTile from './components/SnakeTile';
import Ticker from './components/Ticker';
import Food from './components/Food';
import ResultScene from './components/ResultScene';

import config from './config';
import { makeFood, checkCollision } from './utils';

const dirMap = {
  ArrowUp: { rowDet: -1, colDet: 0 },
  ArrowDown: { rowDet: 1, colDet: 0 },
  ArrowLeft: { rowDet: 0, colDet: -1 },
  ArrowRight: { rowDet: 0, colDet: 1 },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: 'playing',
    };
    this.initState();
  }

  // global states
  initState() {
    this.snakePos = [{ row: config.initRow, col: config.initCol }];
    this.dir = dirMap.ArrowRight;
    this.foodPos = makeFood(config.boardSize, this.snakePos);
  }

  handleTick = () => {
    const { row, col } = last(this.snakePos);
    const nextPos = {
      row: (row + this.dir.rowDet + config.boardSize) % config.boardSize,
      col: (col + this.dir.colDet + config.boardSize) % config.boardSize,
    };

    this.snakePos.push(nextPos);

    if (checkCollision(this.snakePos)) {
      this.setState({ gameState: 'lost' });
      return;
    }

    if (isEqual(nextPos, this.foodPos)) {
      //make new food
      this.foodPos = makeFood(config.boardSize, this.snakePos);
      if (this.foodPos === null) {
        this.setState({ gameState: 'won' });
        return;
      }
    } else {
      this.snakePos.shift();
    }
    this.setState({}); // no matter what, trigger a rerender.
  };

  handleKeyDown = e => {
    this.dir = dirMap[e.key];
  };

  handleReplay = () => {
    this.initState();
    this.setState({ gameState: 'playing' });
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    switch (this.state.gameState) {
      case 'playing':
        return (
          <Ticker onTick={this.handleTick}>
            {() => {
              return (
                <Board>
                  <Food {...this.foodPos} />
                  {this.snakePos.map((pos, id) => (
                    <SnakeTile row={pos.row} col={pos.col} key={id} />
                  ))}
                </Board>
              );
            }}
          </Ticker>
        );
      case 'lost':
        return <ResultScene result="you lost" onReplay={this.handleReplay} />;
      case 'won':
        return <ResultScene result="you won" onReplay={this.handleReplay} />;
      default:
        return null;
    }
  }
}

export default App;
