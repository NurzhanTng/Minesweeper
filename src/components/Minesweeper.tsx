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
  const [board, setBoard] = useState(new Board({...BoardParameters[mode], isStarted, setIsStarted} ));

  useEffect(() => {
    restart();
  }, [])

  function restart() {
    const newBoard = new Board( {...BoardParameters[mode], isStarted, setIsStarted} );
    newBoard.initCells();
    setBoard( newBoard );
  }

  function startGame(target: Cell) {
    board.createMines(target);
    board.createNumberCells();
    setIsStarted(true);
    board.isStarted = true;
  }

  return (
    <div className='minesweeper'>
      <BoardComponent
        board={board}
        startGame={ (cell: Cell) => startGame(cell) }
        restart={ () => restart() }
      />
    </div>
  );
}

export default Minesweeper