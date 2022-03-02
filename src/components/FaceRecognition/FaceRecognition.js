import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
        {box.length === 0?<div/>:box.map((boxitem) => {
          return <div key={boxitem.topRow} className='bounding-box' style={{top: boxitem.topRow, right: boxitem.rightCol, bottom:boxitem.bottomRow, left: boxitem.leftCol}}></div>
        })}
        
        
        
        
      </div>
    </div>
  );
}

export default FaceRecognition;