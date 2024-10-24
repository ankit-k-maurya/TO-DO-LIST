import React from "react";
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import * as jose from 'jose'

const Navbar = (prop) => {
  const filterItem = prop.filterItem;
  const menuList = prop.menuList;

  console.log("menuList:", menuList)
  const navigate = useNavigate();

  const gotoCartDetails = () => {
    navigate('/Cart')
  }
  const token = document.cookie;
  const claims = jose.decodeJwt(token)
  const FirstName = claims.FirstName;
  return (
    <>
        <div className="cart">
          <AddShoppingCartIcon sx={{ fontSize: 40 ,marginRight:5}}
            onClick={() => gotoCartDetails()} />
            <Avatar sx={{ marginRight:3}}>{FirstName}</Avatar>
        </div>
      <nav className="navbar">
        <div className="btn-group">
          {menuList.map((curElem) => (
            // return (
            <button key={curElem.index}
              className="btn-group__item"
              onClick={() => filterItem(curElem)}
            >
              {curElem}
            </button>
          ))}
        </div>
      </nav>

    </>
  );
};

export default Navbar;
