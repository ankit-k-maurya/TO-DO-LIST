import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios.jsx";
import './App.css';
import * as jose from 'jose'
const CustomerLogin = () => {

    const navigate = useNavigate();
    const [EmailID, setEmailID] = useState();
    const [Password, setPassword] = useState()
    // document.cookie = "ctoken=token; expires=Mon, 06 May 2024 12:00:00 UTC; path=/";
    const setCookie = (cname, cvalue, exdays)=> {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }

    const submitForm = async (e) => {
        e.preventDefault();
        if (EmailID && Password) {
            const res = await axios.post('/getEmailPassword', {
                EmailID: EmailID,
                Password: Password,
            });
            // const CustomerID =res.data.result.CustomerID;
            // const FirstName = res.data.result.FirstName;
            // console.log('ResCID', CustomerID);
            // console.log('ResFname', FirstName);
            const token = res.data.jwt;
            console.log('Res', token);
            if(token == null){
                alert ('Pls registration before login .You are not registred')
                navigate('/CustomerReg')
            }
           
           else{
             const claims = jose.decodeJwt(token)
            console.log(claims)
            const cid = claims.CustomerID;
            console.log('cid',cid)
            const gtoken = "ankit";
            const message = res.data.message;
            console.log('res', message);
            setCookie(gtoken,token,1);
            setEmailID('')
            setPassword('')
            navigate('/Resturant')
           }

        } else {
            alert('plg fill the data ')
        }
    }
    
    return (
        <>
            <div className="Container">
                <div className="cardl">
                    <h1>CustomerLogin:</h1>
                    <form onSubmit={submitForm}>
                        <div >
                            <label htmlFor="Firstname"><h2>EmailID:</h2></label>
                            <input type="text" name="Enter EmailId" id="EmailId" placeholder="Enter Your EmailId" autoComplete="off"
                                value={EmailID}
                                onChange={(e) => setEmailID(e.target.value)}
                            />
                        </div>
                        <br />
                        <div >
                            <label htmlFor="Firstname"><h2>Password:</h2></label>
                            <input type="password" name="Enter Password" id="password" placeholder="Enter Your Password" autoComplete="off"
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <br />
                    <button type="submit"> Submit</button>
                    </form>
                    
                </div>
            </div>
        </>
    )
}

export default CustomerLogin