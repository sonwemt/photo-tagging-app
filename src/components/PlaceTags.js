function PlaceTags({ tags }) {
  return <> {tags.map((tag) => {
    const styles = {
      tagStyle: {
        left: `${tag.location.left}%`, 
        top: `${tag.location.top}%`,
        width: `${tag.location.right - tag.location.left}%`,
        height: `${tag.location.bottom - tag.location.top}%`,
      }
    }
    return <div key={tag.id + 'f'} className={`tag ${tag.id}`} style={styles.tagStyle}></div>
  })}</>
}



export { PlaceTags }