import './App.css';
import Header from './components/Header';
import Image from './components/Image';
import Footer from './components/Footer';
import pic2 from './content/pic2.jpg';

function App() {
  return (
    <div id="App">
      <Header headerText='Identify The Aircraft'/>
      <Image imageRef={pic2} imageName='pic2'/>
      <Footer />
    </div>
  );
}

export default App;
