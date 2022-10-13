import './App.css';
import { Header } from './components/Header';
import { Image } from './components/Image';
import { Footer } from './components/Footer';
import pic2 from './content/pic2.jpg';
import { useEffect, useState } from 'react';

const aircraft = [
  {
    name: 'P-40 Warhawk',
    id: 1,
    location: { 
      left:14.84, 
      right: 35.46, 
      top: 44.84, 
      bottom: 58.06,
    },
  },
  {
    name: 'F-22 Raptor',
    id: 2,
    location: { 
      left:31.32, 
      right: 69.86, 
      top: 25.71, 
      bottom: 37.37,
    },
  },
  {
    name: 'A-10 Thunderbolt II',
    id: 3,
    location: { 
      left:62.2, 
      right: 97.64, 
      top: 47.79, 
      bottom: 61.63,
    },
  },
  {
    name: 'F-4 Phantom',
    id: 4,
    location: { 
      left:9.66, 
      right: 53.59, 
      top: 61.48, 
      bottom: 72.83,
    },
  }
];


function App() {
  const [timerRunning, setTimerRunning] = useState(true);
  const [time, setTime] = useState(0)
  // const [finalTime, setFinalTime] = useState(0);



  useEffect(() => {
    const timer = setInterval(() => {
      setTime(time + 1);
      console.log(time);
    }, 1000)
    if(!timerRunning) {
      clearInterval(timer);
      console.log('All aircraft found. Your time: ' + time);
    }
    return () => clearInterval(timer);
  }, [timerRunning, time])

  return (
    <div id="appcontainer">
      <Header headerText='Identify The Aircraft' time={time} />
      <Image imageRef={pic2} imageName='pic2' array={aircraft} setTimerRunning={setTimerRunning} time={time} />
      <Footer />
    </div>
  );
}

export { App };
