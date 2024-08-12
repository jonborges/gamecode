import React, { useState } from 'react';
import Container from "../../Components/Container";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import styles from "./JogoDaVelha.module.css";

function JogoDaVelha() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (index) => (
    <button 
      className={styles.square} 
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </button>
  );

  const status = winner 
    ? `Vencedor: ${winner}` 
    : `Próxima jogada: ${isXNext ? 'X' : 'O'}`;

  return (
    <>
      <Header />
      <Container>
        <div className={styles.velha}>
          <h1>Jogo da Velha</h1>
          <div className={styles.status}>{status}</div>
          <div className={styles.board}>
            <div className={styles.boardRow}>
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className={styles.boardRow}>
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className={styles.boardRow}>
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>
          <button className={styles.resetButton} onClick={resetGame}>
            Resetar Jogo
          </button>
        </div>
      </Container>
      <Footer />
    </>
  );
}

// Função para calcular o vencedor
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default JogoDaVelha;
