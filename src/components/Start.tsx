import {gameModes} from "../models/gameParameters";

interface StartProps {
  setMode: (mode: gameModes) => void
}

function Start({ setMode }: StartProps) {
  return (
    <div>
      <h2>Minesweeper</h2>
      <button onClick={() => setMode(gameModes.EASY)}>start</button>
    </div>
  )
}

export default Start