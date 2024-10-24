import { useState, useEffect } from "react";
// import {gotoResturant} from './MenuCard.jsx';
import { useNavigate } from 'react-router-dom';
// import Items from "./menuApi.jsx";
import axios from "../axios.jsx";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import * as jose from 'jose'
const Cart = () => {

  const navigate = useNavigate();

  // const location = useLocation();
  // console.log('location', location);
  /* const data = ({
     ID: location.state.ID,
     Name: location.state.Name,
     CategoryName: location.state.CategoryName,
     Price: location.state.Price,
     image: location.state.image,
     Descreption: location.state.Descreption
   });
 */
  //  const getLocalCartData =  gotoResturant()
  const gotoOrderDetails = () => {
    navigate('/OrderDetails')
  }

  const getLocalCartData = () => {
    let localCartData = JSON.parse(localStorage.getItem("Card"));
    // console.log("localCartData", localCartData)
    if (localCartData === -1) return [] //[]
    return localCartData;
  };
  const [Cart, setCart] = useState(getLocalCartData());
  // const Cart = getLocalCartData();
  console.log("Cart", Cart)

  useEffect(() => {
    // if (Cart === undefined) return []
    //  if (Cart === null) localStorage.setItem("Card", JSON.stringify([]));
    localStorage.setItem("Card", JSON.stringify(Cart));
    return () => {}
  }, [Cart]);


  if (Cart.length < 0) {
    let message = "you are not select any product pls select any product ."
    return message
  }

  const Delete = (index) => {
    // console.log("index", index)
    var detail = Cart.filter((curElem) => {
      // console.log("Cart", curElem.ID)
      return curElem.ID !== index;
    })
    setCart(detail);
    // localStorage.setItem("Card", JSON.stringify(detail))
  }

  const IncNum = (ID, Name, CategoryName, Price, Descreption, image) => {
    // insert product in my Cart
    // if product does not exists in my Cart then,
    let ifProductExists = Cart.findIndex((curElem) => {
      return curElem.ID === ID;
    });
    if (ifProductExists === -1) {
      // prepare the product
      const product = {
        ID: ID,
        Name: Name,
        CategoryName: CategoryName,
        Price: Price,
        image: image,
        Descreption: Descreption,
        Count: 1
      }
      // add to the Cart
      Cart.push(product)
    }
    // otherwise, product already exists, don't do anything, proceed next


    let newCart = Cart.map((curElem) => {
      // return curElem.ID === ID;
      if (curElem.ID === ID) {
        return { ...curElem, Count: curElem.Count + 1 }
      }
      return curElem
    });

    setCart(newCart);
    // save the data
    // localStorage.setItem("Card", JSON.stringify(Cart))
  }

  const DecNum = (ID) => {
    // let productIndex = Cart.findIndex((curElem) => {
    // return curElem.ID === ID;
    // });
    // add +1 to the count
    let newCart = Cart.map((curElem) => {
      // return curElem.ID === ID;
      if (curElem.ID === ID) {
        return { ...curElem, Count: curElem.Count - 1 }
      }
      return curElem
    });

    setCart(newCart);//let a, b = 4; function abc (param1) {console.log(param1)} ;    abc(a = b); console.lo
    // save the data
    // localStorage.setItem("Card", JSON.stringify(Cart))
  };

  const Quantity = (ID) => {

    // let Count = Cart.map((curElem)=>curElem.Count);
    // return Count;
    //  console.log('Count',Cart[0].Count)
    let productIndex = Cart.findIndex((curElem) => curElem.ID === ID);
    if (productIndex === -1) return 0;
    // console.log('quantity', Cart[productIndex].Count)
    return Cart[productIndex].Count;
    // const quantity = Cart.get('Count');
    // return quantity;

  }
  //  const quantity = Quantity();
  // console.log('quantity',quantity)
  // let sum = 0; for (let i = 0; i < Cart.length; i++) { sum += Cart[i];}
  const date = new Date();

  // Cart.map((curElem)=>{
  // const {Price,Count}=  curElem
  // console.log('price',Price);
  // console.log('quantity',Count)
  // const sum =+ Price*Count;
  // console.log('Amount',sum)
  // });

  let Price = Cart.map((curElem) => curElem.Price);

  // console.log('price', Price)

  let Count = Cart.map((curElem) => curElem.Count);

  // console.log('quantity', Count)

  let amount = [];
  for (let i = 0; i < Price.length; i++) {
    let result = Price[i] * Count[i];
    amount = [...amount, result];
    // console.log('amount', amount);
  }
  let sum = 0;
  for (let i = 0; i < amount.length; i++) { sum += amount[i]; }
  console.log("Sum", sum)


  const GetOrders = async () => {
    const token = document.cookie;
    const claims = jose.decodeJwt(token)
    const CustomerID = claims.CustomerID;
    console.log('CID', CustomerID)
    
    const res = await axios.post('/order', {
      odate: date,
      tamount: sum,
      customerid: CustomerID
    })
    console.log('Data:', res)
    alert(res.data.message)
    console.log("ID",res.data.result.OrderID)
    console.log("Cart", Cart)
    let items = [];
    for(let i=0; i< Cart.length; i++) {
      items.push({
        orderid:res.data.result.OrderID,
        productid: Cart[i].ID,
        quantity: Cart[i].Count,
        subtotal: Cart[i].Price,
      })
    }
    console.log(items)
    const response = await axios.post('/orderitem', items)
    console.log('OrderItem', response);
    // setItems(res);
  }
  // console.log('Data:',data)
  // console.log("Cart",Cart[0]["Price"])
  // const subtotal =Cart[0]["Price"] * count;

  return (
    <>
      <h1 className="heade">Your CartItem List </h1>
      <section className="main-card--cointainer">

        {Cart.map((curElem) => {
          console.log('ID, Name, CategoryName, Price, image, Descreption',curElem)
          const { ID, Name, CategoryName, Price, image, Descreption } = curElem;
          return <>
            <div className="card-container">
              <div className="card" key={ID}>
                <div className="card-body">
                  {/* <span className="card-author subtle">{CategoryName}</span> */}
                  <h2 className="card-title">{Name} </h2>
                  <span className="card-description subtle">
                      {Descreption}
                    </span>
                  {/* <div className="card-read">Read</div> */}
                </div>
                <img src={'http://localhost:8010/hello/' + image} alt="images" className="card-media" />
                <div className="btn-pric">
                  <span className="card-author subtle"><FaIndianRupeeSign />{Price * Quantity(ID)}</span><br />
                  <h1>Quantity:{Quantity(ID)}</h1>
                  <button className="button-card " onClick={() => IncNum(ID, Name, CategoryName, Price, Descreption, image)}>+ </button>
                  <button className="button-card " onClick={() => DecNum(ID, Name, CategoryName, Price, Descreption, image)}>-</button>
                  <button className="button-card " onClick={() => Delete(ID)}><MdDeleteForever /></button>
                </div>
              </div>
            </div>
          </>
        })}
      </section>
      <button className="buttone" onClick={() => navigate(-1)}> go to Back</button>
      <button className="buttone" onClick={() => GetOrders()}> Get Orders</button>
      <button className="buttone" onClick={() => gotoOrderDetails()} >Order Details </button>
    </>
  );
};

export default Cart