import './App.css';
import { Header } from './components/Header';
import { Image } from './components/Image';
import { Footer } from './components/Footer';
import { StartPrompt } from './components/StartPrompt';
import pic2 from './content/pic2.jpg';
import { useEffect, useState } from 'react';
import db from './components/firebase';
import { collection, doc, getDocs } from 'firebase/firestore';


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
      <Image
      imageRef={pic2}
      imageName='pic2'
      aircraftRef={aircraftRef}
      setTimerRunning={setTimerRunning}
      time={time} listRef={listRef}
      highscoreData={highscoreData}
      getScores={getScores}
      />:
      <StartPrompt setGameStart={setGameStart} /> 
      }
      <Footer /> 
    </div>
  );
}

export { App };
