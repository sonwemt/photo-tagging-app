import { useState } from 'react';
import '../styles/header.css';
import { Highscores } from './Highscores';


function Header( {headerText, time, highscoreData, getScores} ) {
  const [showHighscores, setShowHighscores] = useState(false);

  const handleHighscoreClick = () => {
    if(!showHighscores) {
      setShowHighscores(true);
      if(!highscoreData) {
        getScores();
      }
    } else {
      setShowHighscores(false);
    }
  }

  return (
  <div id="headerContainer">
    <div id='highscoresContainer'>
      <button onClick={handleHighscoreClick}>Highscores</button>
      {showHighscores ?<div id="highscores">
       {highscoreData ? <Highscores highscores={highscoreData} />:
       <div>Fetching</div>}
        </div>: null}
    </div>
    <h1 id="header">{headerText}</h1>
    <h3 id="timer">Time elapsed: {time}</h3>
  </div>
  );
}

export{ Header };