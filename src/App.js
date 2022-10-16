import './App.css';
import { Header } from './components/Header';
import { Image } from './components/Image';
import { Footer } from './components/Footer';
import pic2 from './content/pic2.jpg';
import { useEffect, useState } from 'react';
import db from './components/firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { StartPrompt } from './components/StartPrompt';

const aircraft = [
  {
    name: 'P-40 Warhawk',
    id: 1,
    left: 14.84,
    right: 35.46,
    top: 44.84,
    bottom: 58.06,
  },
  {
    name: 'F-22 Raptor',
    id: 2,
    left: 31.32,
    right: 69.86,
    top: 25.71,
    bottom: 37.37,
  },
  {
    name: 'A-10 Thunderbolt II',
    id: 3,
    left: 62.2,
    right: 97.64,
    top: 47.79,
    bottom: 61.63,
  },
  {
    name: 'F-4 Phantom',
    id: 4,
    left: 9.66,
    right: 53.59,
    top: 61.48,
    bottom: 72.83,
  }
];

const aircraftRef = collection(db, 'Aircraft');
const listRef = doc(aircraftRef, 'List');

const playersRef = collection(db, 'Players');

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);
  const [time, setTime] = useState(0);
  const [highscoreData, setHighscoreData] = useState(false);

  useEffect(() => {
    if(gameStart) {
      const timer = setInterval(() => {
        setTime(time + 1);
        console.log(time);
      }, 1000)
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
    setHighscoreData(tempArray);
  }

  return (
    <div id="appcontainer">
      <Header headerText='Identify The Aircraft' time={time} highscoreData={highscoreData} getScores={getScores}/>
      {
      gameStart ? 
      <Image imageRef={pic2} imageName='pic2' array={aircraft} aircraftRef={aircraftRef} setTimerRunning={setTimerRunning} time={time} listRef={listRef} />:
      <StartPrompt setGameStart={setGameStart} /> 
      }
      <Footer /> 
    </div>
  );
}

export { App };
