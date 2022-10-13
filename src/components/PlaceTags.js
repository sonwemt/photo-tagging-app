function PlaceTags({ tags }) {
  return <> {tags.map((tag) => {
    const tagStyle = {
        left: `${tag.left}%`, 
        top: `${tag.top}%`,
        width: `${tag.right - tag.left}%`,
        height: `${tag.bottom - tag.top}%`,
    }
    return <div key={tag.id + 'f'} className={`tag ${tag.id}`} style={tagStyle}></div>
  })}</>
}



export { PlaceTags }