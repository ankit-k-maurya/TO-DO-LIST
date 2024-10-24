import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import CustDetails from './CustomerDetails';
import CustomerUpdateD from './CustomerDataUpdate';
import BasicForm from './CustomerReg';
function Routehome() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<CustDetails />}
                    />
                    <Route
                        exact
                        path="/CustomerUpdateD"
                        element={<CustomerUpdateD />}
                    />
                    <Route
                        exact
                        path="/BasicForm"
                        element={<BasicForm/>}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}
 
export default Routehome;