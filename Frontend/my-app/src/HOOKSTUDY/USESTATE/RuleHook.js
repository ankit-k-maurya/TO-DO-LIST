import React from "react";
import { useState } from "react";

const RuleHooks = ( ) =>{

    const [myName,setMyName] = useState('Ankit kumar')
    return(
        <div>
        <h1>{myName}</h1>
        </div>
    )
}
export default RuleHooks 