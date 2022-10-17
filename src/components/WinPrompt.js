import { useEffect } from 'react';
import '../styles/winprompt.css';
import { Highscores } from './Highscores';

function WinPrompt( {time, highscoreData, getScores} ) {
  useEffect(() => {
      if(!highscoreData) {
        getScores();
      }
  }) 

  return(
  <div id="winContainer">
    <div className="info">
      <h3 className="winInfo">All aircraft found. Your Score: {time}</h3>
      {highscoreData ? <Highscores highscores={highscoreData} />: <div>Fetching scores...</div>}
    </div>
  </div>
  );
}

export { WinPrompt };