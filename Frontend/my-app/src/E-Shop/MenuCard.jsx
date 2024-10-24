// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";

const MenuCard = ({ menuData }) => {

  const navigate = useNavigate();
  const gotoResturant = (ID, Name, CategoryName, Price, Description, Image) => {
    const data = ({
      ID: ID,
      Name: Name,
      CategoryName: CategoryName,
      Price: Price,
      Image: Image,
      Description: Description,
      Count: 1
    });
    const olddata = JSON.parse(localStorage.getItem("Card"))
    console.log("olddata", olddata)
    if (olddata == null) localStorage.setItem("Card", JSON.stringify([data]));
    else if (olddata !== null) localStorage.setItem("Card", JSON.stringify([...olddata, data]));
    navigate('/Cart')
  }
  /*const getLocalCartData = () => {
    let localCartData = JSON.parse(localStorage.getItem("Card")); // [{}, {}, {}]
    if (localCartData) return [] //[]

    return localCartData;
  };

  const cart = getLocalCartData();
  console.log("cart", cart)
*/
  /*
    const IncNum = (ID, Name, CategoryName, Price, Description, Image) => {
      // insert product in my cart
      // if product does not exists in my cart then,
      let ifProductExists = cart.findIndex((curElem) => {
        return curElem.ID === ID;
      });
      if (ifProductExists === -1) {
        // prepare the product
        const product = {
          ID: ID,
          Name: Name,
          CategoryName: CategoryName,
          Price: Price,
          Image: Image,
          Description: Description,
          Count: 1
        }
        // add to the cart
        cart.push(product)
      }
      // otherwise, product already exists, don't do anything, proceed next
  
      // increment the product with count +1
      // find the item in the cart
      let productIndex = cart.findIndex((curElem) => {
        return curElem.ID === ID;
      });
      // add +1 to the count
      cart[productIndex].Count = cart[productIndex].Count + 1
  
      // save the data
      localStorage.setItem("Card", JSON.stringify(cart))
    }
    const Quantity = (ID) => {
      // insert product in my cart
      // if product does not exists in my cart then,
      let ifProductExists = cart.findIndex((curElem) => {
        return curElem.ID === ID;
      });
      // return to the cart
      if (ifProductExists === -1) return []
      // otherwise, product already exists, don't do anything, proceed next
  
      // increment the product with count +1
      // find the item in the cart
      let productIndex = cart.findIndex((curElem) => {
        return curElem.ID === ID;
      });
      return cart[productIndex].Count;
    }
    const DecNum = (Count, ID) => {
      // if (Count === 1) return Count;
      const index = menuData.find((curElem) => curElem.ID === ID);
      Count = index;
    }
  */
  console.log("menuData", menuData)
  return (
    <>
      <section className="main-card--cointainer">
        {menuData.map((curElem) => {
          const { ID, Name, CategoryName, Price, Image, Description, Count } = curElem;
          return (
            <>
              <div className="card-container">
                <div className="card " key={ID}>
                  <div className="card-body">
                    {/* <span className="card-number card-circle subtle">{id}</span> */}
                    {/* <span className="card-author subtle"> {CategoryName}</span> */}
                    <h2 className="card-title"> {Name} </h2>
                    <span className="card-description subtle">
                      {Description}
                    </span>
                    {/* <div className="card-read">Read</div> */}
                  </div>
                  <img src={'http://localhost:8010/hello/' + Image} alt="images" className="card-media" />
                  <div className="btn-pric">
                    <span className="card-author subtle">
                      <FaIndianRupeeSign /> {Price}
                    </span>
                    {/*<button className="card-tag  subtle" onClick={gotoResturant}>Add to Cart </button> */}
                    {/* <h1>Quantity:{Quantity(ID)}</h1> */}
                    {/* <button className="button-card" onClick={() => IncNum(ID, Name, CategoryName, Price, Description, Image)}>+ </button>*/}
                    {/* <button className="button-card" onClick={() => DecNum(ID)}>-</button><br /> */}
                    <button className="buttone" onClick={() => gotoResturant(ID, Name, CategoryName, Price, Description, Image, Count)} >Add to Cart </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
};

export default MenuCard;
