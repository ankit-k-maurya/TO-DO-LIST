import { GetProductlist, GetProductDetaile, OrerDetaile, Purchase, getProductDetails, createOrder, createOrderItem } from './apiservises.js';

const Getdata = async (req, res, next) => {
    const { rowCount, rows } = await GetProductlist();
    console.log('Valu : ', rowCount, rows);
    const obj = { message: `You have total ${rowCount} Customer`, data: rows }
    res.obj = obj;
    next()
}

const sendData = (req, res) => {
    res.send(res.obj);
}

const Products = async (req, res, next) => {

    let message, OBJ;
    const productid = req.params.productid
    const { rowCount, rows } = await GetProductDetaile(productid);
    if (rowCount > 0) {
        OBJ = { message: `Your productlist data is:`, data: rows }
    }
    else {
        message = "You are searching Productlist is not found :"
    }
    res.status(200).send({ OBJ, message });//how to send multiple value in send method:
    res.count = rowCount;
    next();
}

const Orders = async (req, res, next) => {

    let message, obj;
    const { rowCount, rows } = await OrerDetaile();
    if (rowCount > 0) {
        obj = { message: "Your order detaile is :", data: rows };
    }
    else {
        message = "You are not give any order: ";
    }
    res.status(200).send({ obj, message });
    res.count = rowCount;
    next();
}

const BuyItem = async (req, res, next) => {

    let message, obj;
 const customerid = req.params.customerid;
    const { rowCount, rows } = await Purchase(customerid);
    console.log('rowCount:',rowCount ,'Rows:',rows)
    if (rowCount > 0) {
        obj = { message: "Your order detaile is :", data: rows };
    }
    else {
        message = "You are not give any order: ";
    }
    res.status(200).send({ obj, message });
    res.count = rowCount;
    next();
}

const cgetdata = async (req, res, next) => {
    let obj, message
    const { productid, quantity } = req.body;
    const { rowCount, rows } = await getProductDetails(productid);
    if (rowCount > 0) {
        const productPrice = rows[0].price;
        const totalPrice = productPrice * quantity;
        obj = { message: "Total price of product is:", data: totalPrice }
    }
    else {
        message = " Pls give any order:"
    }

    res.send({ obj, message });
}

const pgetdata = async (req, res, next) => {
    let obj, message,totalPrice=0;

    const date = new Date();
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.slice(-2);
    const day = `${date.getDate()}`.slice(-2);

    const formattedDate = `${year}-${month}-${day}`;
    const { customerid, order} = req.body;
    for (let index = 0; index < order.length; index++){
        var product = order[index];
        var productId = product.productid;
        var Quantity = product.quantity;
    const { rowCount, rows } = await getProductDetails(productId);
    console.log('result:',rowCount , 'results:',rows);
    if (rowCount > 0) {
        var productPrice = rows[0].price;
       
        var subtotal = productPrice * Quantity;
        console.log('ProductPtice:',productPrice );
        console.log('Quantity:',Quantity);
        console.log('subtotal:',subtotal);
        order.subtotal = subtotal;
        totalPrice = totalPrice+subtotal
        obj = { message: "Total price of product is:", data: totalPrice }
    }
    else {
        message = " Pls give any order:"
    }
}
    const result = await createOrder(customerid, formattedDate, totalPrice);
    console.log('result:', result);
    const RowCount = result.rowCount;
    const Rows = result.rows;
    let orderid = Rows[0].orderid;
    for (let index = 0; index < order.length; index++){
        var product = order[index];
        var productId = product.productid;
        var Quantity = product.quantity;
  
    // res.send({ obj, message });
    const results = await createOrderItem(orderid,productId , Quantity, subtotal);
    console.log('result:', results);
}
    res.send(obj);
}


export { Getdata, sendData, Products, Orders, BuyItem, cgetdata, pgetdata }   