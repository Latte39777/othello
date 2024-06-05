import { useState } from 'react';
import styles from './index.module.css';

const directions = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

const reversePlace = (x: number, y: number, board: number[][], turnColor: number) => {
  board[y][x] = turnColor;
  for (const direction of directions) {
    for (let a: number = 1; a <= 6; a++) {
      if (
        board[y + direction[1] * a] !== undefined &&
        board[y + direction[1] * a][x + direction[0] * a] === 3 - turnColor
      ) {
        if (
          board[y + direction[1] * (a + 1)] !== undefined &&
          board[y + direction[1] * (a + 1)][x + direction[0] * (a + 1)] === turnColor
        ) {
          for (let b: number = 1; b <= a; b++) {
            board[y + direction[1] * b][x + direction[0] * b] = turnColor;
          }
        }
      } else {
        break;
      }
    }
  }
  return board;
};

const getPutPlace = (board: number[][], turnColor: number) => {
  for (let c = 0; c <= 7; c++) {
    for (let d = 0; d <= 7; d++) {
      if (board[d][c] === 0 || board[d][c] === 3) {
        board[d][c] = 0;
        for (const direction of directions) {
          for (let a: number = 1; a <= 6; a++) {
            if (
              board[d + direction[1] * a] !== undefined &&
              board[d + direction[1] * a][c + direction[0] * a] === 3 - turnColor
            ) {
              if (
                board[d + direction[1] * (a + 1)] !== undefined &&
                board[d + direction[1] * (a + 1)][c + direction[0] * (a + 1)] === turnColor
              ) {
                board[d][c] = 3;
              }
            } else {
              break;
            }
          }
        }
      }
    }
  }
  return board;
};

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    // [0, 0, 0, 0, 0, 3, 2, 1],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 3, 2, 1],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 3, 2, 1],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 3, 2, 1],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const newBoard = structuredClone(board);
  const clickHandler = (x: number, y: number) => {
    if (board[y][x] === 3) {
      const reversed = reversePlace(x, y, newBoard, turnColor);
      const getPutted = getPutPlace(reversed, 3 - turnColor);
      setTurnColor(3 - turnColor);
      setBoard(getPutted);
      if (getPutted.flat().filter((cell) => cell === 3).length === 0) {
        const newGetPutted = getPutPlace(getPutted, turnColor);
        setTurnColor(turnColor);
        console.log('AAA', turnColor);
        setBoard(newGetPutted);
        if (newGetPutted.flat().filter((cell) => cell === 3).length === 0) {
          console.log('BBB');
          const newNewGetPutted = getPutPlace(newGetPutted, 3 - turnColor);
          setTurnColor(3 - turnColor);
          setBoard(newNewGetPutted);
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.setcontainer}>
        {board.flat().filter((cell) => cell === 3).length === 0
          ? 'サ終'
          : turnColor === 1
            ? '黒'
            : '白'}
        <div>siro:{board.flat().filter((cell) => cell === 2).length}</div>
        <div>kuro:{board.flat().filter((cell) => cell === 1).length}</div>
      </div>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div
              className={styles.cell}
              key={`${x}-${y}`}
              onClick={() => {
                clickHandler(x, y);
              }}
            >
              {color !== 0 && color !== 3 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#ffff' }}
                />
              )}
              {color === 3 && (
                <div className={styles.circle} style={{ background: '#rgb(0 200 200)' }} />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
