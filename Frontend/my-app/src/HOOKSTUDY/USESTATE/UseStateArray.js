import React from "react";
import { useState } from "react";

const UseStateArray = () => {

    const bioData = [
        {
            id: 0, myName: "Ankit", age: 26
        },
        {
            id: 1, myName: "Shivsagar", age: 28
        },
        {
            id: 2, myName: "Maurya", age: 30
        }
    ]

    const [myArray, setMyArray] = useState(bioData)


    const clearArray = ( ) => {
        setMyArray([]);
    }
    const removeElem = (id ) => {
       const myNewArray = myArray.filter((curElem) =>{
        return curElem.id !==id;
       }) 
       setMyArray(myNewArray);          
    }
    return (
        <div>
            {
                myArray.map((curElm) => {
                    return (
                        <h1 key={curElm.id}> Name:
                            {curElm.myName} & My age is{curElm.age} 
                            <button onClick={ () => removeElem(curElm.id)}>Remove  </button>
                        </h1>);
                })
            }
            <button onClick={clearArray}>Clear</button>
        </div>
    )
}
export default UseStateArray