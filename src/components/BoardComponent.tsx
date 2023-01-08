import {FC} from "react";
import Board from "../models/Board";
import Cell from "../models/Cell";
import CellComponent from "./CellComponent";


interface BoardProps {
  board: Board;
  startGame: (cell: Cell) => void;
  restart: () => void;
}

const BoardComponent: FC<BoardProps> = ({ board, startGame, restart }) => {

  return (
    <div className='board'>
      {board.cells.map((row, index) =>
        <div className='board__row' key={index}>
          {row.map(cell =>
            <CellComponent
              restart={restart}
              startGame={startGame}
              cell={cell}
              key={cell.id}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default BoardComponent