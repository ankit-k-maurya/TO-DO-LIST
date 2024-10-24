import React, { useEffect, useState } from "react";
import './App.css';
const UseEffect2 = ( ) => {
    const[widthCount,setwidthCount] = useState(window.screen.width)

    const actualWidth = () =>{
        setwidthCount(window.innerWidth)
    }

    useEffect(()=>{
        window.addEventListener('resize', actualWidth);
   
          return () =>{
            window.removeEventListener("resize",actualWidth)
          }
    })
    return(
        <div className="Container">
            <p>The actual size of the window is: </p>
            <h1>{widthCount}</h1>
        </div>
    )
}
export default UseEffect2