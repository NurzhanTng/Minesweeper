import {FC, useEffect, useState} from "react";
import Board from "../models/Board";
import Cell from "../models/Cell";
import CellComponent from "./CellComponent";


interface BoardProps {
  board: Board;
}

const BoardComponent: FC<BoardProps> = ({ board }) => {

  function gameOver() {

  }

  return (
    <div className='board'>
      {board.cells.map((row, index) =>
        <div className='board__row' key={index}>
          {row.map(cell =>
            <CellComponent
              cell={cell}
              board={board}
              key={cell.id}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default BoardComponent