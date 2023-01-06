import React, {useState} from 'react';

import Start from "./components/Start";
import Minesweeper from "./components/Minesweeper";
import './static/css/App.css';
import {gameModes} from "./models/gameParameters";


function App() {
  const [mode, setMode] = useState<gameModes | null>(null)

  return (
    <div className="App">
      {mode ?
        <Minesweeper mode={mode} setMode={setMode}/> :
        <Start setMode={setMode} />
      }
    </div>
  );
}

export default App;
