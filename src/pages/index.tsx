import { useState } from 'react';
import styles from './index.module.css';
import { IncrementalCache } from 'next/dist/server/lib/incremental-cache';

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
    const newBoard = structuredClone(board);
    IncrementalCache

    if (board[y + 1][x] === 2 / turnColor && board[y + 2][x] === turnColor) {
      newBoard[y][x] = turnColor;
      newBoard[y + 1][x] = turnColor;
      setTurnColor(2/ turnColor);
    }

    if (board[y - 1][x] === 2 / turnColor && board[y - 2][x] === turnColor) {
      newBoard[y][x] = turnColor;
      newBoard[y - 1][x] = turnColor;
      setTurnColor(2/ turnColor);
    }

    if (board[y][x + 1] === 2 / turnColor && board[y][x + 2] === turnColor) {
      newBoard[y][x] = turnColor;
      newBoard[y][x + 1] = turnColor;
      setTurnColor(2/ turnColor);
    }

    if (board[y][x - 1] === 2 / turnColor && board[y][x - 2] === turnColor) {
      newBoard[y][x] = turnColor;
      newBoard[y][x - 1] = turnColor;
      setTurnColor(2/ turnColor);
    }

    if (board[y + 1][x + 1] === 2 / turnColor && board[y + 2][x + 2] === turnColor) {
      newBoard[y][x] = turnColor;
      newBoard[y + 1][x + 1] = turnColor;
      setTurnColor(2/ turnColor);
    }

    if (board[y - 1][x - 1] === 2 / turnColor && board[y - 2][x - 2] === turnColor) {
      newBoard[y][x] = turnColor;
      newBoard[y - 1][x - 1] = turnColor;
      setTurnColor(2/ turnColor);
    }

    if (board[y - 1][x + 1] === 2 / turnColor && board[y - 2][x + 2] === turnColor) {
      newBoard[y][x] = turnColor;
      newBoard[y - 1][x + 1] = turnColor;
      setTurnColor(2/ turnColor);
    }

    if (board[y + 1][x - 1] === 2 / turnColor && board[y + 2][x - 2] === turnColor) {
      newBoard[y][x] = turnColor;
      newBoard[y + 1][x - 1] = turnColor;
      setTurnColor(2/ turnColor);
    }

    setBoard(newBoard)
    setBoard(newBoard);
    newBoard[y][x] = turnColor;
    setTurnColor(2 / turnColor)
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
