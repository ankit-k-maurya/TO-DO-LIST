import React , {useRef,useState} from "react";

const Uncontrolled = () => {

    // it like a useState only and its preserve the value.NO rerender
    const luckyName = useRef(null)
    const[show , setShow] = useState(false);

    const submitForm = (e) =>{
        e.preventDefault();
        const name = luckyName.current.value;
        name === "" ? alert("Plz fill the data") : setShow(true);
    }

    return (
        <div className="background">
            <div className="card">
                <form action="" onSubmit={submitForm}>
                    <div>
                        <label htmlFor="luckyName">Enter your luckyName :</label><br />
                        <input type="text" id="luckyName" ref={luckyName } />
                    </div>
                    <br />
                    <button>Submit</button>
                </form>  
        </div>
        <p>{ show ? `Your lucky name is ${luckyName.current.value}`: " "}</p>
            </div>
    )
}
export default Uncontrolled