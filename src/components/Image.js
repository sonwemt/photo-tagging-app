import { useEffect, useState } from 'react';
import '../styles/image.css';
import { DropdownMenu } from './DropdownMenu';
import { PlaceTags } from './PlaceTags';

function Image({ imageRef, imageName, array, setTimerRunning }) {
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [selectorPos, setSelectorPos] = useState(false);
  const [taggedPositions, setTaggedPositions] = useState([]);

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
      let selectorWidth;
      const selectorHeight = selector.offsetHeight;

      // Make sure dropdown doesn't overflow
      if(mouseX + selector.offsetWidth > image.width + boundary.left - dropdownmenu.clientWidth) {
        selector.style.flexDirection = 'row-reverse';
        selectorWidth = selector.offsetWidth + dropdownmenu.offsetWidth;
      } else {
        selector.style.flexDirection = 'row';
        selectorWidth = selector.offsetWidth - dropdownmenu.offsetWidth;
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

  const handleListClick = (e, index) => {
    e.stopPropagation();
    if((selectorPos.x > array[index].location.left && selectorPos.x < array[index].location.right) && 
    (selectorPos.y > array[index].location.top && selectorPos.y < array[index].location.bottom)) {
      setSelectorVisible(false);
      if(!taggedPositions.find((tag) => tag.id === array[index].id)) {
        setTaggedPositions(() => taggedPositions.concat(array[index]));
      }
      
    } else {
      console.log('not true')
    }
  }

  useEffect(() => {
    console.log('x: ' + selectorPos.x, 'y: ' + selectorPos.y)
  }, [selectorPos])

  useEffect(() => {
    console.log(taggedPositions);
    if(taggedPositions.length === array.length) {
      setTimerRunning(false);
    }
  }, [taggedPositions, array, setTimerRunning])

  return (<div className='backgroundContainer' onClick={(e) => handleImageClick(e)}>
    <div className='imageContainer'>
      <img src={imageRef} alt={imageName} className='image' ></img>
      {
        selectorVisible ? 
        <div id='selectorContainer' >
          <div id='imageSelector'></div>
          <DropdownMenu array={array} taggedPositions={taggedPositions} handleListClick={handleListClick} ></DropdownMenu>
        </div> : null
      }
      <PlaceTags tags={taggedPositions} />
    </div>
  </div>
  );
}

export { Image };