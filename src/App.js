import './App.css';
import { Header } from './components/Header';
import { Image } from './components/Image';
import { Footer } from './components/Footer';
import { StartPrompt } from './components/StartPrompt';
import pic2 from './content/pic2.jpg';
import { useEffect, useState } from 'react';
import db from './components/firebase';
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';


const aircraftRef = collection(db, 'Aircraft');
const listRef = doc(aircraftRef, 'List');

const playersRef = collection(db, 'Players');

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);
  const [time, setTime] = useState(0);
  const [highscoreData, setHighscoreData] = useState(false);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    if(gameStart) {
      const timer = setInterval(() => {
        const newTime = time + 0.1;
        setTime(Math.round((newTime + Number.EPSILON) * 100) / 100);
      }, 100)
      if (!timerRunning) {
        clearInterval(timer);
        console.log('All aircraft found. Your Score: ' + time);
      }
      return () => clearInterval(timer);
    }
  }, [gameStart, timerRunning, time])

  const getScores = async () => {
    const playerSnap = await getDocs(playersRef);
    const tempArray = [];
    playerSnap.forEach((doc) => {
      tempArray.push({id: doc.id, score: doc.data().score})
    })
    tempArray.sort((prev, curr) => {
      return prev.score - curr.score;
    })
    setHighscoreData(tempArray);
  }

  const updateScores = async (name, score) => {
    if(highscoreData.length < 15) {
      await setDoc(doc(db, 'Players', `${name}`), {
        score: score,
      })
      await getScores();
      return;
    }

     const closestScore = highscoreData.find((player, index) => {
      if(score < player.score) {
        return true;
      }
      return false;
    });
    if(closestScore === undefined) {
      console.log('Your score was not good enough for the top15');
      return;
    }
    
    await deleteDoc(doc(db, 'Players', `${highscoreData.pop().id}`));
    await setDoc(doc(db, 'Players', `${name}`), {
      score: score,
    })
    await getScores();
  }

  return (
    <div id="appcontainer">
      <Header headerText='Identify The Aircraft' time={time} highscoreData={highscoreData} getScores={getScores} playerName={playerName}/>
      {
      gameStart ? 
      <Image
      imageRef={pic2}
      imageName='pic2'
      aircraftRef={aircraftRef}
      setTimerRunning={setTimerRunning}
      time={time} listRef={listRef}
      highscoreData={highscoreData}
      getScores={getScores}
      updateScores={updateScores}
      playerName={playerName}
      setPlayerName={setPlayerName}
      />:
      <StartPrompt setGameStart={setGameStart} /> 
      }
      <Footer /> 
    </div>
  );
}

export { App };
