import '../styles/highscores.css';

function Highscores({highscores, playerName}) {
  return highscores.length < 1 ? <div>No highscores so far</div> :
    <ul id="highscoreList">
    {
      highscores.map((player, index) => {
        return <li key={player.id} className={player.id === playerName ? `scoreItem client`: 'scoreItem'}>{index + 1}.{player.id}: {player.score}</li>
      })
    }
  </ul>
  
}

export { Highscores }