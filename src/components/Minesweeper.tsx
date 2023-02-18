import {useEffect, useState} from "react";
import BoardComponent from "./BoardComponent";

import {BoardParameters, gameModes} from "../models/gameParameters";
import Board from "../models/Board";
import Cell from "../models/Cell";

import '../static/css/Minesweeper.css'


interface MinesweeperProps {
  mode: gameModes,
  setMode: (mode: gameModes) => void,
}

function Minesweeper({ mode, setMode }: MinesweeperProps) {
  const [isStarted, setIsStarted] = useState(false);
  const [board, setBoard] = useState(new Board({
    ...BoardParameters[mode],
    isStarted,
    setIsStarted,
    startGame,
    restart,
    updateBoard,
  }));

  useEffect(() => {
    restart();
  }, [])

  function restart() {
    const newBoard = new Board( {
      ...BoardParameters[mode],
      isStarted,
      setIsStarted,
      startGame,
      restart,
      updateBoard
    });
    newBoard.initCells();
    setBoard( newBoard );
  }

  function startGame(target: Cell) {
    board.initCells()
    board.createMines(target);
    board.createNumberCells();
    setIsStarted(true);
    board.isStarted = true;
    updateBoard();
  }

  function updateBoard(newBoard?: Board) {
    if (newBoard) {
      setBoard(newBoard.copy())
      return newBoard.copy()
    }
    setBoard( board.copy() );
    return board.copy();
  }

  return (
    <div className='minesweeper'>
      <BoardComponent
        board={board}
      />
    </div>
  );
}

export default Minesweeper