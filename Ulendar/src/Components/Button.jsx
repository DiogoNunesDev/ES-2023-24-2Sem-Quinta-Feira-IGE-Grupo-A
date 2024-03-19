import React from 'react'
import "../styles/SideBar.css";

function Button(props) {
    const {text} = props
  return (
    <div >
        {text}
    </div>
  )
}

export default Button;