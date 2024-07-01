import { useState } from 'react';
import styles from './index.module.css';
import Swal from 'sweetalert2';

const finsh = (board: number[][], turnColor: number) => {
  for (let x = 0; x < 3; x++) {
    if (board[x][0] === turnColor && board[x][1] === turnColor && board[x][2] === turnColor) {
      return true;
    }
  }
  for (let y = 0; y < 3; y++) {
    if (board[0][y] === turnColor && board[1][y] === turnColor && board[2][y] === turnColor) {
      return true;
    }
  }
  if (board[0][0] === turnColor && board[1][1] === turnColor && board[2][2] === turnColor) {
    return true;
  }
  if (board[2][0] === turnColor && board[1][1] === turnColor && board[0][2] === turnColor) {
    return true;
  }
  return false;
};

const Home = () => {
  const [turncolor, setTurncolor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const clickHandler = (x: number, y: number) => {
    const newboard = structuredClone(board);
    if (turncolor === 1 && board[y][x] === 0) {
      newboard[y][x] = 1;
    }
    if (turncolor === 2 && board[y][x] === 0) {
      newboard[y][x] = 2;
    }
    if (finsh(newboard, turncolor) === true) {
      Swal.fire(`Player wins!`);
    }
    setBoard(newboard);
    setTurncolor(3 - turncolor);
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((cell, x) => (
            <div
              className={styles.cell}
              key={`${x}-${y}`}
              onClick={() => {
                clickHandler(x, y);
              }}
            >
              {cell === 1 && <div>x</div>}
              {cell === 2 && <div>o</div>}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
