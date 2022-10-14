import '../styles/dropdownmenu.css';

function DropdownMenu({ listData, handleListClick, taggedPositions }) {
  return <ul className="dropdownmenu">
    {listData ? listData.map((item, index) => {
      const itemFound = taggedPositions.find((tag) => {
        return item === tag.name;
      })
      return !itemFound ? <li key={item} className='dd-listItem' onClick={(e) => handleListClick(e, index)}>{item}</li> : null;
    }): <li>Loading...</li>}
  </ul>
}

export { DropdownMenu };