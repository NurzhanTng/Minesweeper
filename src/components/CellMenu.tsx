import {FC} from "react";
import Cell from "../models/Cell";



interface CellMenuProps {
  cell: Cell;
  onCancel: () => void;
  onDig: () => void;
  onFlag: () => void;
}

const CellMenu: FC<CellMenuProps> = ({ cell, onCancel, onFlag, onDig }) => {
  return (
    <div className='menu'>
      <button onClick={onCancel} className="menu__cancel">
        <div className="menu__x" />
      </button>
      <button onClick={onDig} className="menu__shovel">
        <div className="menu__shovel-icon" />
      </button>
      {!cell.isVisible && (
        <button onClick={onFlag} className='menu__flag'>
          <div className="menu__flag-icon" />
        </button>
      )}
    </div>
  );
}

export default CellMenu