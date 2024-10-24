import React, { useState } from "react";
import "./style.css";
import Menu from "./menuApi.jsx";
import MenuCard from "./MenuCard";
import Navbar from "./Navbar";


const uniqueList = [
  ...new Set(
    Menu.map((curElem) => {
      return curElem.CategoryName;
    })
  ),
  "All"
];

// console.log(uniqueList);

const Resturant = () => {
  const [menuData, setMenuData] = useState(Menu);
  //const [menuList, setMenuList] = useState(uniqueList);

  const filterItem = (CategoryName) => {
    if (CategoryName === "All") {
      setMenuData(Menu);
      return;
    }

    const updatedList = Menu.filter((curElem) => {
      return curElem.CategoryName === CategoryName;
    });

    setMenuData(updatedList);
  };

  return (
    <>
      <Navbar filterItem={filterItem} menuList={uniqueList} />
      <MenuCard menuData={menuData} />

    </>
  );
};

export default Resturant;
