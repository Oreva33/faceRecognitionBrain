import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  const h = "https://" || "http://";
  return (
    <div className="center ma">
      <div className="absolute mt2">
        {box.length === 0 && !imageUrl ? (
          <p></p>
        ) : box.length === 0 && !imageUrl.includes(h) ? (
          <p className="error-text">
         Invalid Address 
          </p>
        ) :box.length === 0 && imageUrl ? (
          <p>
            
       <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
       
          </p>
        ) : box.length > 0 && imageUrl ? (
          <div>
            {box.map((boxitem) => {
              return (
                <div
                  key={boxitem.topRow}
                  className="bounding-box"
                  style={{
                    top: boxitem.topRow,
                    right: boxitem.rightCol,
                    bottom: boxitem.bottomRow,
                    left: boxitem.leftCol,
                  }}
                ></div>
              );
            })}
          </div>
        ) : (
          <p> Something went wrong</p>
        )}

        <img id="inputimage" alt="" src={imageUrl} width="500px" heigh="auto" />
      </div>
    </div>
  );
};

export default FaceRecognition;
