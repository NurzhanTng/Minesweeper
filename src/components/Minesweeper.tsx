import {gameModes} from "../models/gameParameters";

interface MinesweeperProps {
  mode: gameModes,
  setMode: (mode: gameModes) => void,
}

function Minesweeper({ mode, setMode }: MinesweeperProps) {
  return (
    <div>
      <h2>Minesweeper</h2>
    </div>
  );
}

export default Minesweeper