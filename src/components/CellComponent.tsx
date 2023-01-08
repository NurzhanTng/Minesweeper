import {FC, useState} from "react";
import Cell from "../models/Cell";
import randomInt from "../utils/randInt";
import {MineColors} from "../models/gameParameters";


interface CellProps {
  cell: Cell,
  startGame: (cell: Cell) => void;
  restart: () => void;
}

const CellComponent: FC<CellProps> = ({ cell, startGame, restart }) => {
  const [menuShown, setMenuShown] = useState(false);

  function click(target: Cell) {
    console.log('clicked');

    if (!target.board.isStarted) {
      console.log('Game not started')
      startGame(target);
      click(target);
      return;
    }

    if (target.isMine()) {
      console.log('Game over');
      // restart();
      return;
    }


  }

  return (
    <div
      className={[
        'cell',
        `cell_${cell.color}`,
        // (cell.isVisible && cell.isMine()) ? 'mine' : '',
        // (cell.isVisible && cell.isMine()) ? `mine_${ MineColors[randomInt(0, 5)] }` : '',
        (cell.isMine()) ? 'mine' : '',
        (cell.isMine()) ? `mine_${ MineColors[randomInt(0, 5)] }` : '',
      ].join(' ')}
      onClick={() => click(cell)}
    >
      {menuShown && (
        <div />
      )}
      {(!cell.isMine() && cell.value !== 0 && cell.isVisible) && (
        <p className={['number', `number_${cell.getColor()} : ''`].join(' ')}>
          {cell.value}
        </p>
      )}
    </div>
  );
}

export default CellComponent