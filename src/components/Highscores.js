function Highscores({highscores}) {
  return <ul id="highscoreList">
   {
   highscores.map((player, index) => {
     return <li key={player.id} className='scoreItem'>{player.id}: {player.score}</li>
   })
   }
  </ul>
}

export { Highscores }