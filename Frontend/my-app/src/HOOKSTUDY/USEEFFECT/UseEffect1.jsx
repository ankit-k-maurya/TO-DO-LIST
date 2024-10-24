import React, { useEffect, useState } from "react";

const UseEffects = ()=>{

    const [coutn,setCoutn] = useState(0) 

    useEffect(()=>{
        if(coutn >= 1)
        {
            document.title = `chats(${coutn})`
        }else{
            document.title = `chats`
        }
    })
    console.log ('hello Useeffct')
    return(
        <div>
            <h1>{coutn}</h1>
            <button className="button" onClick={()=>{
                setCoutn(coutn+1)
            }}
            >Click</button>
        </div>
    )
}
export default UseEffects