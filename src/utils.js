import range from 'lodash/range';
import random from 'lodash/random';
import some from 'lodash/some';
import last from 'lodash/last';

export function makeFood(boardSize, snakePos) {
  const totalTiles = boardSize * boardSize;
  if (snakePos.length === totalTiles) {
    return null;
  }

  let availabilityMap = range(totalTiles - 1).map(() => true);

  snakePos.forEach(pos => {
    availabilityMap[pos.row * boardSize + pos.col] = false;
  });

  let rand = random(totalTiles - snakePos.length - 1);
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (availabilityMap[row * boardSize + col]) {
        rand--;
        if (rand < 0) {
          return { row, col };
        }
      }
    }
  }
  // imposible to reach here
}

export function checkCollision(snakePos) {
  const head = last(snakePos);
  return some(snakePos.slice(0, -1), pos => pos.col === head.col && pos.row === head.row);
}
