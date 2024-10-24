import React from "react";
import { useState} from "react";
import { useNavigate,useLocation} from 'react-router-dom';
import './App.css';
import axios from "../axios.jsx";

const CustomerUpdateD = () =>{

    const navigate = useNavigate();
  const location = useLocation();
// console.log('location',location);


    const [data, setData] = useState({
        CustomerID:location.state.CustomerID,
        firstname: location.state.firstname,
        lastname: location.state.lastname,
       emailid: location.state.emailid,
       address:location.state.address
    })
    const [allEntry, setAllEntry] = useState([])
    const [message, setMessage] = useState()
  
const submitForm = async(e) => {
    e.preventDefault();
    // console.log("data",data);
    const res =  await axios.patch('/customers/'+data.CustomerID,{
            firstname:data.firstname,
            lastname:data.lastname,
            emailid: data.emailid,
            address: data.address
        }); 
    if(res.status === 200) {
        
      const detail =  allEntry.find((curElem) => {
            return curElem.CustomerID === data.CustomerID;
          });
          console.log('detail:',detail)
          setAllEntry(detail);
        
    } else {
        setMessage(res.data.message)
    }
}

return (
    <div className="Container">
        <div className="card">
           <h1>-: CUSTOMER UPDATE FORM:-</h1>
           <form onSubmit={submitForm} className="card">
           <div>
                    <label htmlFor="CustomerID"><h2>CustomerID:</h2></label>
                    <input type="text" name="CustomerID" id="CustomerID" placeholder="Enter Your CustomerID" autoComplete="off"
                    value={data.CustomerID}
                        onChange={(e) => setData({ ...data, CustomerID:e.target.value })}
                    />
                </div>
           <div>
                    <label htmlFor="Firstname"><h2>Firstname:</h2></label>
                    <input type="text" name="firstName" id="firstName" placeholder="Enter Your First Name" autoComplete="off"
                        value={data.firstname}
                       onChange={(e) => setData({ ...data, firstname:e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="Lastname"><h2>Lastname:</h2></label>
                    <input type="text" name="lastName" id="lastName" placeholder="Enter Your Last Name " autoComplete="off"
                       value={data.lastname}
                       onChange={(e) => setData({ ...data, lastname:e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="email"><h2>Email:</h2></label>
                    <input type="text" name="email" id="email" placeholder="Enter email id " autoComplete="off"
                       value={data.emailid}
                       onChange={(e) => setData({ ...data, emailid:e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="Address"><h2>Address:</h2></label>
                    <input type="text " name="address" id="address" placeholder="Enter Youraddress" autoComplete="off"
                       value={data.address}
                       onChange={(e) => setData({ ...data, address:e.target.value })}
                    />
                </div>
                <div className="textBox" ><h2>{message}</h2></div>
               <button type="submit"> Submit</button>
                <button onClick={() => navigate(-1)}>GO BACK </button>          
            </form>
             
        </div>
    </div>
);
}
export default CustomerUpdateD