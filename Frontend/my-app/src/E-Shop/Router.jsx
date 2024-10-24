import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Resturant from './Resturant';
import Cart from "./Cart";
import OrderDetails from './OrderDetails';
import CustmerLogin from '../Customer/CustomerLogin';
import CustomerReg from '../Customer/CustomerReg';
const Router = () => {
    return (

        <BrowserRouter>
            <Routes>
                <Route
                    exact
                    path="/Resturant"
                    element={<Resturant />}
                />
                <Route
                    exact
                    path="/Cart"
                    element={<Cart />}
                />
                  <Route
                    exact
                    path="/OrderDetails"
                    element={<OrderDetails />}
                /> 
                <Route
                    exact
                    path="/"
                    element={<CustmerLogin/>}
                />
                <Route
                    exact
                    path="/CustomerReg"
                    element={<CustomerReg/>}
                />
            </Routes>
        </BrowserRouter>
    );
}
export default Router