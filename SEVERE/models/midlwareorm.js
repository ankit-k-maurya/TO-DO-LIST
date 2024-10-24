import fs from 'fs';
import { getEmailPassword, MakeLogin, getProduct, UpdateProductDetails, Createschedule, getSchedule, UpdateScheduleDetail, deleteSchedule, customer, getCustomer, getOneCustomer, deletecustomer, OrerDetaile, Purchase, ORMPurchase, UpdateCustomerDetail, category, product, order, orderitem } from './servisesorm.js';
import * as jose from 'jose';
/*
module.exports = (DataTypes,Model,sequelize) =>{
class Createcustomer extends Model { }

Createcustomer.init({
  // Model attributes are defined here
  CustomerID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Auto incremented primary key',
  },
  FirstName: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  LastName: {
    type: DataTypes.STRING,
    defaultValue: 'Singh'
    // allowNull defaults to true
  },
  EmailID: {
    type: DataTypes.STRING
  },
  Address: {
    type: DataTypes.STRING
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Createcustomer', // We need to choose the model name
  //   timestamps:false 
  createdAt: false,
  updatedAt: 'update_at',
  obj:'Createcustomer',
  // res.obj:obj

});

class Createcategory extends Model { }

Createcategory.init({
  // Model attributes are defined here
  CategoryID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Auto incremented primary key',
  },
  CategoryName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Createcategory' // We need to choose the model name
});

class CreateProduct extends Model { }

CreateProduct.init({
  // Model attributes are defined here
  ProductID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Auto incremented primary key',
  },
  ProductName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Price: {
    type: DataTypes.INTEGER,
  },
  StockQuantity: {
    type: DataTypes.INTEGER
  },
  CategoryID: {
    type: DataTypes.INTEGER,
    forgeinkey: true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'CreateProduct' // We need to choose the model name
});

class CreateOrderitem extends Model { }

CreateOrderitem.init({
  // Model attributes are defined here
  OrderItemID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Auto incremented primary key',
  },
  OrderID: {
    type: DataTypes.INTEGER,
    forgeinkey: true
  },
  ProductID: {
    type: DataTypes.INTEGER,
    forgeinkey: true
  },
  Quantity: {
    type: DataTypes.INTEGER,
  },
  Subtotal: {
    type: DataTypes.INTEGER
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'CreateOrderitem' // We need to choose the model name
});

class CreateOrder extends Model { }

CreateOrder.init({
  // Model attributes are defined here
  OrderID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Auto incremented primary key',
  },
  OrderDate: {
    type: DataTypes.DATE,
  },
  TotalAmount: {
    type: DataTypes.INTEGER
  },
  CustomerID: {
    type: DataTypes.INTEGER,
    forgeinkey: true,
    references: {
      model: Createcustomer, // 'Movies' would also work
      key: 'CustomerID'
    }

  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'CreateOrder' // We need to choose the model name
});
return (Createcustomer,Createcategory,CreateProduct,CreateOrderitem,CreateOrder,sendData);
}
CreateProduct.belongsTo(Createcategory);
CreateOrder.belongsTo(Createcustomer);
Createcustomer.hasMany(CreateOrder);
CreateOrderitem.belongsTo(CreateOrder);
CreateOrderitem.belongsTo(CreateProduct);

*/

const BulidSchedule = async (req, res) => {
  let obj;
  const { Task, TaskDate, TaskTime } = req.body;
  const result = await Createschedule(Task, TaskDate, TaskTime);
  if (result) {
    obj = { message: "Task is successfully Registerd:", result }
  }
  else {
    obj = { message: "Your task is not registerd." }
  }
  res.status(201).send(obj);
}

const BulidLogin = async (req, res) => {
  let obj;
  const { EmailID, Password } = req.body;
  console.log("Email:", EmailID, "Password:", Password)
  const result = await MakeLogin(EmailID, Password);
  if (result) {
    obj = { message: " successfully Login:", result }
  }
  else {
    obj = { message: "Your are not registerd." }
  }
  res.status(201).send(obj);
}

const Verification = async (req, res) => {
  let obj;

  const {EmailID, Password } = req.body;
  // console.log("Email:", EmailID, "Password:", Password)

  const result = await getEmailPassword(EmailID, Password);
  console.log("result",result)
  if (result) {
     const CustomerID  = result.dataValues.CustomerID
     const FirstName  = result.dataValues.FirstName
    // CustomerID:CustomerID,FirstName:FirstName
  const secret = new TextEncoder().encode(
    'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
  )
  const alg = 'HS256'

  const jwt = await new jose.SignJWT({ EmailID: EmailID,CustomerID:CustomerID,FirstName:FirstName })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    // .setIssuer(EmailID)
    // .setAudience(EmailID)
    .setExpirationTime('2h')
    .sign(secret)

  // console.log(jwt)
  // const respons = req.Cookies;
  // console.log('respons', respons);

 
    obj = { message: " successfully Login:", result, jwt }
  }
  else {
    obj = { message: "Your are not registerd." }
  }

  res.status(201).send(obj);
}


const getScheduleDetails = async (req, res) => {
  let obj;
  const result = await getSchedule();
  if (result) {
    obj = { message: "Your Schedule is today :", result }
  }
  else {
    obj = { message: "your Schedule result is not found." }
  }
  res.status(200).json(obj);
}

const UpdateSchedule = async (req, res) => {
  let obj;
  const ScheduleID = req.params.ScheduleID;
  const { Task, TaskDate, TaskTime } = req.body;
  const result = await UpdateScheduleDetail(ScheduleID, Task, TaskDate, TaskTime);
  if (result) {
    obj = { message: "Your Task Details Updated Successfully:", result }
  }
  else {
    obj = { message: "Your Task Details is not Updated." }
  }
  res.status(201).send(obj);
}

const DeletedSchedule = async (req, res) => {
  let obj;
  const scheduleid = req.params.scheduleid;
  const result = await deleteSchedule(scheduleid);
  if (result) {
    obj = { message: "Your Task  successfully remove:", result }
  }
  else {
    obj = { message: "Your Task  is not remove." }
  }
  res.status(200).json(obj);
}

const Bulidcustomer = async (req, res) => {
  let obj;
  const { firstname, lastname, emailid, address, password } = req.body;
  const result = await customer(firstname, lastname, emailid, address, password);
  if (result) {
    obj = { message: "customer is successfully Registerd:", result }
  }
  else {
    obj = { message: "your customer is not registerd." }
  }
  res.status(201).send(obj);
}

const BulidCategory = async (req, res) => {
  let obj;
  const { CategoryName } = req.body;
  const result = await category(CategoryName);
  if (result) {
    obj = { message: "Category is successfully Registerd.", result }
  }
  else {
    obj = { message: "your data are not registerd." }
  }
  res.status(201).send(obj);
}

const BulidImage = (req, res) => {
  fs.readFile('./images/' + req.params.id, function (err, data) {
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.write(data);
    return res.end();
  })
  // res.send('Hello World!'+req.params.id);
}

const Bulidproduct = async (req, res) => {
  let obj;
  const { pname, price, squantity, categoryid, images } = req.body;
  const result = await product(pname, price, squantity, categoryid, images);
  if (result) {
    obj = { message: "Product is successfully Registerd.", result }
  }
  else {
    obj = { message: "your product is not registerd." }
  }
  res.status(201).send(obj);
}

const UpdateProduct = async (req, res) => {
  let obj;
  const ProductID = req.params.ProductID;
  const { ProductName, Price, StockQuantity, CategoryCategoryID } = req.body;
  const result = await UpdateProductDetails(ProductID, ProductName, Price, StockQuantity, CategoryCategoryID);
  if (result) {
    obj = { message: "Your Task Details Updated Successfully:" }
  }
  else {
    obj = { message: "Your Task Details is not Updated." }
  }
  res.status(201).send(obj);
}

const Bulidorder = async (req, res) => {
  let obj;
  const { odate, tamount, customerid } = req.body;
  const secret = new TextEncoder().encode(
    'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
  )
  const reqcookies = req.cookies;
  const jwt = reqcookies.ankit;
  console.log("jwt:", jwt)  
  try {
    const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret)
    console.log('protectedHeader',protectedHeader)
    console.log('payload', payload)
    const Customeridtoken = payload.CustomerID
    if( Customeridtoken !== undefined){
      const result = await order(odate, tamount, customerid);
      if (result) {
        obj = { message: "Order is successfully Registerd.", result }
      }
      else {
        obj = { message: "your order is not registerd." }
      }
    }
  }catch(e){
    console.log('error',e)
  }
 
  res.status(201).send(obj);
}

const BulidOrderItem = async (req, res) => {
  let obj;
  var item = [];
  for (let i = 0; i < req.body.length; i++) {
    const { orderid, productid, quantity, subtotal } = req.body[i];
    var result = await orderitem(orderid, productid, quantity, subtotal);
    item = [...item, result];
  }
  
  if (item.length) {
    obj = { message: "OrderItem is successfully Registerd.", item }
  }
  else {
    obj = { message: "your data are not registerd." }
  }
  res.status(201).send(obj);
}

const getCustomerDetails = async (req, res) => {
  let obj;
  const result = await getCustomer();
  if (result) {
    obj = { message: "Your searching result is this:", result }
  }
  else {
    obj = { message: "your searching result is not found." }
  }
  res.status(201).json(obj);
}

const getProductDetails = async (req, res) => {
  let obj;
  const result = await getProduct();

  const secret = new TextEncoder().encode(
    'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
  )
  const reqcookies = req.cookies;
  const jwt = reqcookies.ankit;
  console.log("jwt:", jwt)
  if (jwt !== undefined) {
    try {
      const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret)
      console.log('protectedHeader',protectedHeader)
      console.log('payload', payload)
    } catch (e) {
      console.log("error", e)
    }
  } else {
    obj = { message: "Pls login cookies not send token." }
  }
  if (result) {
    obj = { message: "Your searching result is this:", result }
  }
  else {
    obj = { message: "your searching result is not found." }
  }
  res.status(200).json(obj);
}

const SendData = (res) => {
  res.send(res.obj);
}
const getOneCustDetails = async (req, res) => {
  let OBJ;
  const customerid = req.params.customerid
  const result = await getOneCustomer(customerid);
  if (result) {
    OBJ = { message: "You searching customer details is this :", data: result }
  }
  else {
    OBJ = { message: "You are searching customer data is not found." }
  }
  res.status(201).json(OBJ);//how to send multiple value in send method:

}

const UpdateCustomer = async (req, res) => {
  let obj;
  const customerid = req.params.customerid;
  const { firstname, lastname, emailid, address } = req.body;
  const result = await UpdateCustomerDetail(customerid, firstname, lastname, emailid, address);
  if (result) {
    obj = { message: "Your customer Details Updated Successfully:" }
  }
  else {
    obj = { message: "your customer Details is not Updated." }
  }
  res.status(201).send(obj);
}
const Deleted = async (req, res) => {
  let obj;
  const customerid = req.params.customerid;
  const result = await deletecustomer(customerid);
  if (result) {
    obj = { message: "Your customer Details successfully remove:", result }
  }
  else {
    obj = { message: "your customer Details is not remove." }
  }
  res.status(200).json(obj);
}

const BuyItem = async (req, res) => {

  let obj;
  const customeridparm = req.params.customerid;
  const secret = new TextEncoder().encode(
    'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
  )
  const reqcookies = req.cookies;
  const jwt = reqcookies.ankit;
  console.log("jwt:", jwt)
  if (jwt !== undefined){

    try {
      const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret)
      console.log('protectedHeader',protectedHeader)
      console.log('payload', payload)
      const Customeridtoken = payload.CustomerID
      if(Customeridtoken == customeridparm){
        const result = await Purchase(customeridparm);
        if (result) {
          obj = { message: "Your order detaile is :", result };
        }
        else {
          obj = { message: "You are not give any order: " }
      
        }
      }
      
    }
    catch (e) {
      console.log("error", e)
    }
  }
  console.log("Response:",obj)
  res.status(200).json(obj);
}

const ORMBuyItem = async (req, res) => {

  let obj;
  const customerid = req.params.customerid;
  const result = await ORMPurchase(customerid);
  if (result) {
    obj = { message: "Your order detaile is :", result };
  }
  else {
    obj = { message: "You are not give any order: " }

  }
  res.status(200).json(obj);
}

const Orders = async (req, res) => {
  let obj;
  const result = await OrerDetaile();
  if (result) {
    obj = { message: "Your order detaile is :", result };
  }
  else {
    obj = { message: "You are not give any order: " };
  }
  res.status(201).send(obj);
}
/*     
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

// many values inserted
    let customer = await Createcustomer.bulkCreate(
   [ {FirstName:"Arvind",LastName:"Kumar",EmailID:"Avinsh98@gmail.com", Address:"Delhi"},
   { FirstName:"Gulsan",LastName:"Kumar",EmailID:"Naunit98@gmail.com", Address:"Mumbai"}])
    console.log(customer);
    

} catch (error) {
    console.error('Unable to connect to the database:', error);
  }*/
// module.exports = { Createcustomer, sendData, Createcategory, CreateProduct, CreateOrderitem, CreateOrder };
export { Verification, BulidLogin, BulidImage, getProductDetails, UpdateProduct, DeletedSchedule, UpdateSchedule, getScheduleDetails, BulidSchedule, BulidOrderItem, Bulidorder, Bulidproduct, BulidCategory, getCustomerDetails, BuyItem, ORMBuyItem, Orders, SendData, getOneCustDetails, Bulidcustomer, UpdateCustomer, Deleted }