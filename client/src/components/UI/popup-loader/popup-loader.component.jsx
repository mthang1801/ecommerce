import React from 'react'
import "./popup-loader.styles.css";
const PopupLoader = () => {
  return (
    <div className="wrapper">      
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default PopupLoader
