import '../styles/image.css';

function Image({ imageRef, imageName }) {
  return <div className='image'>
    <img className='displayPicture' src={imageRef} alt={imageName} />
  </div>
}

export default Image;