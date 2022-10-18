import { useEffect, useState } from 'react';
import '../styles/winprompt.css';
import { Highscores } from './Highscores';

function WinPrompt( {time, highscoreData, getScores, updateScores, playerName, setPlayerName} ) {
  
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  useEffect(() => {
      if(!highscoreData) {
        getScores();
      }
  }) 

  const handleSubmission = async (e) => {
    e.preventDefault();
    if(!scoreSubmitted) {
      updateScores(playerName, time);
      setScoreSubmitted(true);
    }
  }

  return(
  <div id="winContainer">
    <div className="info">
      <h3 className="winInfo">All aircraft found. Your Score: {time}</h3>
      <form>
        <label htmlFor='name'>Enter your name: </label>
        <input type="text" id='name' name='name' value={playerName} onChange={(e) => {setPlayerName(e.target.value)}}></input>
        <input type="button" onClick={handleSubmission} value="Submit Score"></input>
      </form>
    </div>
    {highscoreData ? <Highscores highscores={highscoreData} playerName={playerName}/>: <div>Fetching scores...</div>}
  </div>
  );
}

export { WinPrompt };