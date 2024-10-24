import React from "react";
import { useState } from "react";
import './App.css';

const BasicForm = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [allEntry, setAllEntry] = useState([]);

    const submitForm = (e) => {
        e.preventDefault();
        if (email && password) {
            const newEntry = { id: new Date().getTime().toString(), email, password }

            setAllEntry([...allEntry, newEntry])
            setEmail('')
            setPassword('')
        } else {
            alert('plg fill the data ')
        }
    }
    return (
        <div className="Container">
            <div className="card">
                <form onSubmit={submitForm}>
                    <div>
                        <label htmlFor="email"> Email Id  </label>
                        <input type="text" name="email" id="email" placeholder="Enter email id or Phone no" autoComplete="off"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div><br />

                    <div>
                        <label htmlFor="password"> Password   </label>
                        <input type="text " name="password" id="password" placeholder="Enter Password " autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div><br />
                    <button className="button" type="submit"> Login</button>
                </form>
            </div> 
            <div>
            {
                allEntry.map((currElem) => {
                    const { id, email, password } = currElem;
                    return <div  key={id}>

                        <p  >{email}</p>
                        <p  >{password}</p>

                    </div>
                })
            }
            </div>
        </div>
    )
}
export default BasicForm
