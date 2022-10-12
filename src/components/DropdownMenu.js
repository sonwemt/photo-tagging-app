function DropdownMenu({ array, handleListClick, taggedPositions }) {
  return <ul className="dropdownmenu">
    {array.map((item, index) => {
      const itemFound = taggedPositions.find((tag) => {
        return item.id === tag.id;
      })
      return !itemFound ? <li key={item.id} className='dd-listItem' onClick={(e) => handleListClick(e, index)}>{item.name}</li> : null;
    })}
  </ul>
}

export { DropdownMenu };