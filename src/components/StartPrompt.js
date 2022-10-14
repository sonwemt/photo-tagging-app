import '../styles/startprompt.css';

function StartPrompt({ setGameStart }) {
  const handleStartClick = () => {
    setGameStart(true);
  }

  return (
  <div id='startContainer'>
    <div className="info">
      <h3 className='startText'>Correctly identify all the aircraft. The timer stops when all aircraft have been identified.</h3>
      <button id='startButton' onClick={handleStartClick}>Click here to start</button>
    </div>
  </div>
  );
}

export { StartPrompt };