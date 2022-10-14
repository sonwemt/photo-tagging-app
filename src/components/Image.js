import { useEffect, useState } from 'react';
import '../styles/image.css';
import { DropdownMenu } from './DropdownMenu';
import { PlaceTags } from './PlaceTags';
import { doc, getDoc } from 'firebase/firestore';

function Image({ imageRef, imageName, array, setTimerRunning, aircraftRef, listRef }) {
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [selectorPos, setSelectorPos] = useState(false);
  const [taggedPositions, setTaggedPositions] = useState([]);
  const [listData, setListData] = useState(false);
  const [showFetchDiv, setShowFetchDiv] = useState(false);

  const handleImageClick = async (e) => {
    // Stop interaction once all tags are found
    if(taggedPositions.length === array.length) {
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
      const selector = document.getElementById('selectorContainer');
      const dropdownmenu = document.querySelector('.dropdownmenu');
      const spacer = document.getElementById('selectorSpace');
      let selectorWidth;
      const selectorHeight = selector.offsetHeight;

      // Make sure dropdown doesn't overflow
      if(mouseX > image.width - boundary.left / 2) {
        selector.style.flexDirection = 'row-reverse';
        selectorWidth = selector.offsetWidth + dropdownmenu.offsetWidth + spacer.offsetWidth;
      } else {
        selector.style.flexDirection = 'row';
        selectorWidth = selector.offsetWidth - dropdownmenu.offsetWidth - spacer.offsetWidth;
      }

      const offsetX = (mouseX - boundary.left - selectorWidth / 2) / image.width * 100;
      const offsetY = (mouseY - boundary.top - selectorHeight / 2) / image.height * 100;

      selector.style.left = offsetX + '%';
      selector.style.top = offsetY + '%';

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
      console.log('not true')
    }
  }

  useEffect(() => {
    console.log('x: ' + selectorPos.x, 'y: ' + selectorPos.y)
  }, [selectorPos])

  useEffect(() => {
    // Stop timer once all tags are found
    if(taggedPositions.length === array.length) {
      setTimerRunning(false);
    }
  }, [taggedPositions, array, setTimerRunning])

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