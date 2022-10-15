function Highscores({highscores}) {
  return <ul id="highscoreList">
   {
   highscores.map((player, index) => {
     return <li key={player.name} className='scoreItem'>{player.name}: {player.score}</li>
   })
   }
  </ul>
}

export { Highscores }