import { useState } from 'react';
import styles from './index.module.css';
import {} from 'http';

function newValid(x: number, y: number) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}
const counter = [2, 2];
let Color = 'Black';

const directions = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [-1, -1],
  [-1, 0],
  [0, -1],
  [-1, 1],
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

  const anothercolor = (x: number, y: number) => {
    return board[y][x] === 2 / turnColor;
  };

  const samecolor = (x: number, y: number) => {
    return board[y][x] === turnColor;
  };

  const uncolor = (x: number, y: number) => {
    return board[y][x] === 0;
  };

  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    console.log(turnColor);
    const newBoard = structuredClone(board);

    if (newValid(x, y) && uncolor(x, y)) {
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
    }

    counter[0] = 0;
    counter[1] = 0;

    for (const row of newBoard) {
      for (let i = 0; i < 8; i++) {
        if (row[i] === 1) {
          counter[0]++;
        }
        if (row[i] === 2) {
          counter[1]++;
        }
      }
    }
    setBoard(newBoard);
  };

  if (turnColor === 1) {
    Color = 'Black';
  }
  if (turnColor === 2) {
    Color = 'White';
  }

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && color !== 3 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#FFF' }}
                />
              )}
              {color === 3 && (
                <div className={styles.condidate} style={{ background: '#CAE5CD' }} />
              )}
            </div>
          )),
        )}
      </div>
      <div className={styles.turnandscore}>
        turn:{Color}
        <br />
        Black:{counter[0]}
        <br />
        White:{counter[1]}
      </div>
    </div>
  );
};
export default Home;
