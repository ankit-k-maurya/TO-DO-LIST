import React from "react";
import { useState } from "react";
import './App.css';
import axios from "../../axios.jsx";

const CustomerDrop = () => {

    const [allEntry, setAllEntry] = useState([])


    const deleteCustomer = async (id) => {
        await axios.delete('/customers/'+id);
        //    const data = response.data.result;
        setAllEntry(
            allEntry.filter((post) => {
                return post.id !== id;
            })
        );
    };

    const Details = (e) => {
        e.preventDefault();
        deleteCustomer(id);
    }

    return (
        <div className="Container">
            <div className="card">
                <h3>-: CUSTOMERS REMOVE DETAILS :-</h3>
                <div>
                    <form onSubmit={Details}>
                    <div className="textBox">
                        <label htmlFor="Enter Customer ID">Enter Customer ID:</label>
                        <input type="text"  placeholder="Enter Customer ID" autoComplete="off"
                            value={id}
                            // onChange={(e) => setFirstName(e.target.value)}
                        /></div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default CustomerDrop