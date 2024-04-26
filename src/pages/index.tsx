import { useState } from 'react';
import styles from './index.module.css';
import {} from 'http';

function newValid(x: number, y: number) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

const directions = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [-1, -1],
  [-1, 0],
  [-1, -1],
  [-1, 0],
];

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    console.log(turnColor);
    const newBoard = structuredClone(board);

    for (const direction of directions) {
      const dx = direction[0];
      const dy = direction[1];

      for (let n: number = 1; n <= 6; n++) {
        if (newValid(x + dx * n, y + dy * n) && anothercolor(x + dx * n, y + dy * n)) {
          if (
            newValid(x + dx * (n + 1), y + dy * (n + 1)) &&
            samecolor(x + dx * (n + 1), y + dy * (n + 1))
          ) {
            for (let m = 1; m <= n; m++) {
              newBoard[y][x] = turnColor;
              newBoard[y + dy * m][x + dx * m] = turnColor;
              setTurnColor(2 / turnColor);
            }
            break;
          }
        }
        if (newValid(x + dx * n, y + dy * n) && samecolor(x + dx * n, y + dy * n)) {
          break;
        }
        if (newValid(x + dx * n, y + dy * n) && uncolor(x + dx * n, y + dy * n)) {
          break;
        }
      }
    }
    setBoard(newBoard);

    const anothercolor = (x: number, y: number) => {
      return board[y][x] === 2 / turnColor;
    };

    const samecolor = (x: number, y: number) => {
      return board[y][x] === turnColor;
    };

    const uncolor = (x: number, y: number) => {
      return board[y][x] === 0;
    };
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#FFF' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};
export default Home;
