import {gameModes} from "../models/gameParameters";

interface StartProps {
  setMode: (mode: gameModes) => void
}

function Start({ setMode }: StartProps) {
  return (
    <div className='start'>
      <h2>Minesweeper</h2>
      <button onClick={() => setMode(gameModes.HARD)}>start</button>
    </div>
  )
}

export default Start