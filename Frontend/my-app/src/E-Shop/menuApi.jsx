import axios from "../axios.jsx";

const response = await axios.get('/getProduct');
// const ResponseOrderItem = await axios.get('/orderitem/'+1);
/*const res = await axios.post('/orderitem',{
  OrderOrderID,
  ProductProductID,
  Quantity, 
  Subtotal
});*/
// console.log('responsOrderitem:',res)
// const Items =res.data.result;
// console.log('responsemenu:',response)
const Menu = response.data.result;
// const OrderDetailsItem = ResponseOrderItem.data.result;
console.log('menu:', Menu);
// console.log('OrderDetailsItem:', OrderDetailsItem)
/*
const description = "I love Maggi realy oo yues  Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, at consectetur totam voluptatibus quibusdam iusto. Accusamus quas, soluta ipsam autem eius necessitatibus fugiat in .";
const Menu = {...menu,description}
console.log('menu:',Menu)
/*const Menu = [
    {
      id: 1,
      image: "./images/car.avif",
      name: "Car",
      category: "AtuoMobile",
      price: "500000₹",
      description:
        "I love Maggi realy oo yues  Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, at consectetur totam voluptatibus quibusdam iusto. Accusamus quas, soluta ipsam autem eius necessitatibus fugiat in . "
    },
  
    {
      id: 2,
      image: "./images/bulb.webp",
      name: "Bulb",
      category: "Electical",
      price: "100₹",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, at consectetur totam voluptatibus quibusdam iusto. Accusamus quas, soluta ipsam autem eius necessitatibus fugiat in . "
    },
    {
      id: 3,
      image: "./images/mobile.avif",
      name: "Mobile",
      category: "Electronics",
      price: "12000₹",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, at consectetur totam voluptatibus quibusdam iusto. Accusamus quas, soluta ipsam autem eius necessitatibus fugiat in . "
    },
    {
      id: 4,
      image: "./images/chair.webp",
      name: "Chair",
      category: "Furniture",
      price: "1000₹",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, at consectetur totam voluptatibus quibusdam iusto. Accusamus quas, soluta ipsam autem eius necessitatibus fugiat in . "
    },
    {
      id: 5,
      image: "./images/door.jpg",
      name: "Door",
      category: "Hardware",
      price: "2000₹",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, at consectetur totam voluptatibus quibusdam iusto. Accusamus quas, soluta ipsam autem eius necessitatibus fugiat in . "
    },
    
  ];*/

export default Menu;
