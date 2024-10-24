import React from "react";
import { useState, useEffect } from "react";
import './App.css';
import { useNavigate } from 'react-router-dom';
import axios from "../axios.jsx";


const CustomerInfo = () => {
    const [allEntry, setAllEntry] = useState([])
    const [message, setMessage] = useState()

    const navigate = useNavigate();

    const fetchPost = async () => {
        try {
            const response = await axios.get('/customers');
            const detail = response.data.result;
            console.log("response:", detail);
            setAllEntry(await detail);

        } catch (error) {
            console.log(error);
        }
    };
    const removeElem = async (id) => {
        console.log("id", id);
        const res = await axios.delete('/customers/' + id);
        if (res.status === 200) {
            const detail = allEntry.filter((curElem) => {
                return curElem.CustomerID !== id;
            })
            setAllEntry(detail);
        } else {
            setMessage(res.data.message)
        }

    }
const handileSumbit =(CustomerID,FirstName,LastName,EmailID,Address)=>{
    navigate("/CustomerUpdateD",{state:{
        CustomerID:CustomerID,
        firstname:FirstName,
        lastname:LastName,
        emailid:EmailID,
        address:Address }
    })
}
    useEffect(() => {
        fetchPost();
    }, []);

    return (
        <div className="Container">
            <h1 className="head" >-: CUSTOMERS DETAILS:-</h1>
            <div className="cardbox">
                <button className="button" onClick={() => navigate("/BasicForm")}>Add Customer </button>
                <div className="textBox" ><h2>{message}</h2></div>
                {
                    allEntry.map((curElm) => {
                        const { CustomerID, FirstName, LastName, EmailID, Address } = curElm;
                        return (
                         /*    <p key={CustomerID}> CustomerID:
                                 {CustomerID}  ,FirstName:{FirstName} , LastName:{ LastName},
                                 EmailID:{EmailID},Address :{Address }
                                 <button onClick={ () => removeElem(CustomerID)}>Remove  </button>
                        </p>*/
                            <table border={1}>
                                <thead key={CustomerID}>
                                    <th>CID</th>
                                    <th>FirstName</th>
                                    <th>LastName</th>
                                    <th>EmailID</th>
                                    <th>Address</th>
                                    <th colSpan={3}>Button</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{CustomerID}</td>
                                        <td>{FirstName}</td>
                                        <td>{LastName}</td>
                                        <td>{EmailID}</td>
                                        <td>{Address}</td>
                                        <td><button onClick={() => removeElem(CustomerID)}>DELETE  </button></td>
                                        <td><button onClick={() =>handileSumbit(CustomerID,FirstName,LastName,EmailID,Address) }>EDIT </button></td>

                                    </tr>
                                </tbody>
                            </table>
                        );
                    })
                }

            </div>
        </div>
    );
}
export default CustomerInfo