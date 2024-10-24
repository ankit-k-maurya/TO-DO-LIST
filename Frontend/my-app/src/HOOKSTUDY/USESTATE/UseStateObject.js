import React from "react";
import { useState } from "react";

const  UseStateObject = () =>{
    const [myObject, setMyObject] = useState({
        myName: 'Ankit' , MyAge:26 , degree: 'B.Sc'
    })
    const changeObject = () =>{
        setMyObject({...myObject, myName:'Shivsagar'})
    }
    return(
        <div>
            <h1> Name : {myObject.myName} & Age: {myObject.MyAge} & Degree:{myObject.degree  } </h1>
            <button onClick={changeObject}> Update</button>
       
        </div>
    )
}
export default UseStateObject