function Highscores({highscores}) {
  return <ul id="highscoreList">
   {
   highscores.map((player, index) => {
     return <li key={player.id} className='scoreItem'>{index + 1}.{player.id}: {player.score}</li>
   })
   }
  </ul>
}

export { Highscores }