import React from 'react';

const ImageForm = ({onInputChange, onPictureSubmit}) => {
  return(
    <div>
      <p className="center white f4">This face detector will detect faces in your pictures. Give it a try!</p>
      <div className="center">
        <div className="form pa4 br3 shadow-5 center">
          <input className="f5 w-70 pa2 br1" type="text" placeholder="Enter url..." onChange={onInputChange}/>
          <button className="grow w-30 f5 link ph3 pv2 br1 dib white bg-dark-pink" onClick={onPictureSubmit}>Detect</button>
         </div>
      </div>
    </div>
  );
}

export default ImageForm;

