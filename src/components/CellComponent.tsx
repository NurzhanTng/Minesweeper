import {FC, useEffect, useState} from "react";
import Cell from "../models/Cell";
import randomInt from "../utils/randInt";
import {MineColors} from "../models/gameParameters";
import CellMenu from "./CellMenu";
import Board from "../models/Board";


interface CellProps {
  cell: Cell,
  board: Board,
}

const CellComponent: FC<CellProps> = ({ cell, board}) => {
  let menuClicked = false;
  const isGameOverWrongFlag = cell.isFlagOver && !cell.isMine() && board.gameOver;
  const isMine = cell.isVisible && cell.isMine();
  console.log(cell, isGameOverWrongFlag, isMine);


  function onDig() {
    menuClicked = true;
    board.click(cell);
  }

  function onFlag() {
    menuClicked = true;
    board.selectedCell = null
    cell.isFlagOver = !cell.isFlagOver;
    board.updateBoard();
  }

  function onCancel() {
    menuClicked = true;
    const newBoard = board.updateBoard();
    newBoard.selectedCell = null;
  }


  return (
    <div
      onClick={() => (!menuClicked) ? board.click(cell) : menuClicked = false}
      className={[
        `cell cell_${cell.color}`,
        (isGameOverWrongFlag) ? 'cell__flag_wrong' : '',
        (isMine) ? `mine mine_${ MineColors[randomInt(0, 5)] }` : '',
      ].join(' ')}
    >
      {board.selectedCell === cell && (
        <CellMenu cell={cell} onDig={onDig} onFlag={onFlag} onCancel={onCancel} />
      )}
      {(!cell.isMine() && cell.value !== 0 && cell.isVisible) && (
        <p className={['number', `number_${cell.getColor()} : ''`].join(' ')}>
          {cell.value}
        </p>
      )}
      {cell.isFlagOver && (
        <div className='cell__flag' />
      )}
    </div>
  );
}

export default CellComponent