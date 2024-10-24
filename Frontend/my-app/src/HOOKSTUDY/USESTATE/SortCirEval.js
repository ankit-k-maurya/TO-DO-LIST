import React from "react";
import { useState } from "react";

const SortCirEval = () => {
    const [demo,setDemo] = useState("" )
   return(
    <div>
           <h1> {demo || 
           <>
            <h1>heloo</h1>
            <p>Myic testing 1 2 3</p>
           </>}</h1>
           
           <h1> {demo && "kumar"}</h1>
    </div>
   )
}
export default SortCirEval
