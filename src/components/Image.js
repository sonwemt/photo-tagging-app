import { useEffect, useState } from 'react';
import '../styles/image.css';
import { DropdownMenu } from './DropdownMenu';
import { PlaceTags } from './PlaceTags';
import { doc, getDoc } from 'firebase/firestore';
import { WinPrompt } from './WinPrompt';

function Image({ 
  imageRef,
  imageName,
  setTimerRunning,
  time,
  aircraftRef,
  listRef, 
  highscoreData,
  getScores,
  updateScores
}) {
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [selectorPos, setSelectorPos] = useState(false);
  const [taggedPositions, setTaggedPositions] = useState([]);
  const [listData, setListData] = useState(false);
  const [showFetchDiv, setShowFetchDiv] = useState(false);
  const [gameover, setGameover] = useState(false);

  const handleImageClick = async (e) => {
    // Stop interaction once all tags are found
    if(taggedPositions.length === listData.length) {
      return;
    }
    const image = document.querySelector('.image');
    const boundary = image.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    if((mouseX > boundary.right || mouseX < boundary.left) ||
      (mouseY > boundary.bottom || mouseY < boundary.top)) {
      setSelectorVisible(false);
      setSelectorPos(false);
    } else {
      if(!selectorVisible) {
        await setSelectorVisible(true);
      }
      const selectorContainer = document.getElementById('selectorContainer');
      const dropdownmenu = document.querySelector('.dropdownmenu');
      const spacer = document.getElementById('selectorSpace');
      let selectorWidth;
      const selectorHeight = selectorContainer.offsetHeight * 0.25;

      // Make sure dropdown doesn't overflow
      if(mouseX < image.width / 2 + boundary.left) {
        selectorContainer.style.flexDirection = 'row';
        selectorWidth = selectorContainer.offsetWidth - dropdownmenu.offsetWidth - spacer.offsetWidth;
      } else {
        selectorContainer.style.flexDirection = 'row-reverse';
        selectorWidth = selectorContainer.offsetWidth + dropdownmenu.offsetWidth + spacer.offsetWidth;
      }

      const offsetX = (mouseX - boundary.left - selectorWidth / 2) / image.width * 100;
      const offsetY = (mouseY - boundary.top - selectorHeight / 2) / image.height * 100;

      selectorContainer.style.left = offsetX + '%';
      selectorContainer.style.top = offsetY + '%';

      // Mouse position without offset
      const posX = (mouseX - boundary.left) / image.width * 100;
      const posY = (mouseY - boundary.top) / image.height * 100;

      // Round to 2 decimals
      setSelectorPos({
        x: Math.round((posX + Number.EPSILON) * 100) / 100,
        y: Math.round((posY + Number.EPSILON) * 100) / 100,
      })
    }
  }

  const handleListClick = async (e, index) => {
    e.stopPropagation();

    const docRef = doc(aircraftRef, `Aircraft ${index + 1}`);
    setShowFetchDiv(true);
    const docSnap = await getDoc(docRef);
    setShowFetchDiv(false);
    const selectedAircraft = docSnap.data();

    if((selectorPos.x > selectedAircraft.left && selectorPos.x < selectedAircraft.right) && 
    (selectorPos.y > selectedAircraft.top && selectorPos.y < selectedAircraft.bottom)) {
      setSelectorVisible(false);
      if(!taggedPositions.find((tag) => tag.id === selectedAircraft.id)) {
        setTaggedPositions(() => taggedPositions.concat(selectedAircraft));
      }
    } else {
      const selector = document.getElementById('imageSelector');
      selector.style.border = 'solid 3px red';
      console.log('not true')
      setTimeout(() => {
        setSelectorVisible(false);
      }, 500);
    }
  }

  useEffect(() => {
    console.log('x: ' + selectorPos.x, 'y: ' + selectorPos.y)
  }, [selectorPos])

  useEffect(() => {
    // Stop timer once all tags are found
    if(taggedPositions.length === listData.length) {
      setTimerRunning(false);
      setGameover(true);
    }
  }, [taggedPositions, listData, setTimerRunning])

  useEffect(() => {
    const getData = async () => {
      const listSnap = await getDoc(listRef);
      setListData(listSnap.data().list);
    }

    if(!listData) {
      getData();
    }
  })

  return (
  <div className='backgroundContainer' onClick={(e) => handleImageClick(e)}>
    <div className='imageContainer'>
      {showFetchDiv ? <div className='fetchDiv'>Fetching...</div>: null}
      {gameover ? <WinPrompt  time={time} highscoreData={highscoreData} getScores={getScores} updateScores={updateScores}/>: null}
      <img src={imageRef} alt={imageName} className='image' ></img>
      {
        selectorVisible ? 
        <div id='selectorContainer' >
          <div id='imageSelector'></div>
          <div id='selectorSpace'></div>
          <DropdownMenu listData={listData} taggedPositions={taggedPositions} handleListClick={handleListClick} ></DropdownMenu>
        </div> : null
      }
      <PlaceTags tags={taggedPositions} />
    </div>
  </div>
  );
}

export { Image };