import {Createschedule,getSchedule,UpdateSchedule,DeletedSchedule,CreateCustomer,CreateCategoriesName,CreateProduct,CreateOrder,CreateOrderitem,GetProductDetaile,OrderItemsDetails,CustomerVerification} from './servisesorm.js';
import fs from 'fs';
import * as jose from 'jose';

const BulidSchedule = async (req, res) =>{
    let obj ;
    const {Task, TaskDate, TaskTime} = req.body;
    const result = await Createschedule (Task, TaskDate, TaskTime);
    if (result){
        obj = {message: "Your Schedule is created sucessfully.",result}
    }
    else{
        obj = {message: "Your Schedule is not created sucessfully."}
    }
    res.status(201).send(obj)
}

const FindSchedule = async (req, res) =>{
    let obj;
    const result = await getSchedule();
    if (result) {
        obj = {message: "Your today Schedule is that.",result}
    } else {
        obj = {message: 'Ops! Your Schedule is not found'}
    }
    res.status(200).send(obj)
}

const ModificationSchedule = async (req, res) =>{
    let obj;
    const {Task, TaskDate, TaskTime} = req.body;
    const result = await UpdateSchedule(Task, TaskDate, TaskTime);
    if (result) {
        obj = {message: "Your Schedule is modificayion sucessfully. ", result}
    } else {
        obj = {message: "Ops! your schdule is not change."}
    }
    res.status(201).send(obj);
}

const DestorySchedule = async (req, res) =>{
    let obj;
    const ScheduleID = req.params.ScheduleID;
    const result = await DeletedSchedule(ScheduleID);
    if (result) {
        obj = {message: "Your Schedule is deleted sucessfully.",result}
    } else {
        obj = {message: 'Ops! Your Schedule is not found'}
    }
    res.status(200).send(obj)
}

const Bulidcustomer = async (req, res) =>{
    let obj ;
    const {FirstName, LastName, EmailID, Password, Addres} = req.body;
    const result = await CreateCustomer (FirstName, LastName, EmailID, Password, Addres);
    if (result){
        obj = {message: "New Customer  is created sucessfully.",result}
    }
    else{
        obj = {message: "New Customer is not created sucessfully."}
    }
    res.status(201).send(obj)
}

const BulidCategory = async (req, res) =>{
    let obj ;
    const {Categoryname} = req.body;
    const result = await CreateCategoriesName(Categoryname);
    if (result){
        obj = {message: "New  CategoryName is created sucessfully.",result}
    }
    else{
        obj = {message: "New Categoryname is not created sucessfully."}
    }
    res.status(201).send(obj)
}

const Bulidproduct = async (req, res) =>{
    let obj ;
    const {Productname, Price, StockQuantity, Description, Image, CategoryID} = req.body;
    const result = await CreateProduct(Productname, Price, StockQuantity, Description, Image, CategoryID);
    if (result){
        obj = {message: "Your Product is created sucessfully.",result}
    }
    else{
        obj = {message: "Your Product is not created sucessfully."}
    }
    res.status(201).send(obj)
}

const Bulidorder = async (req, res) =>{
    let obj ;
    const {OrderDate, Amount, CustomerID} = req.body;
    const secret = new TextEncoder().encode(
        'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
    )
    const reqcookies = req.cookies;
    const jwt = reqcookies.ankit;
    try {
        const {payload, protectHeader} = await jose.jwtVerify(jwt,secret);
        console.log('Payload',payload);
        console.log('protectHeader',protectHeader);
        const CustomerIdToken = payload.CustomerID;
    if(CustomerIdToken !== undefined){
        const result = await CreateOrder (OrderDate, Amount, CustomerID);
        if (result){
            obj = {message: "Your Order is registerd sucessfully.",result}
        }
        else{
            obj = {message: "Your Order is not registerd sucessfully."}
        }
    }
    
    } catch (error) {
       console.log("error",error); 
    }
    res.status(201).send(obj) 
}

const BulidOrderItem = async (req, res) =>{
    let obj ;
    let items = [];
    for (let i = 0; i < req.body.length; i++){
        const {OrderID, ProductID, Quantity,SubTotal} = req.body[i];
    const result = await CreateOrderitem (OrderID, ProductID, Quantity,SubTotal);
    items = [...items, result];
    }
    if (items.length){
        obj = {message: "Your Schedule is created sucessfully.",items}
    }
    else{
        obj = {message: "Your Schedule is not created sucessfully."}
    }
    res.status(201).send(obj)
}

const sendData = async (res) =>{
               res.send(res.obj);
}

const Verification = async (req, res) =>{
      let obj;
      const {EmailID, Password} = req.body;
      const result = await CustomerVerification(EmailID,Password);
      if(result){
        const CustomerID = result.dataValues.CustomerID;
        const FirstName = result.dataValues.FirstName;
        const secert = new TextEncoder().encode(
            'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
        )
        const alg = 'HS256';
        const jwt = await new jose.SignJWT({CustomerID:CustomerID, FirstName:FirstName, EmailID:EmailID})
                       .setProtectedHeader(alg)
                       .setIssuedAt()
                       .setExpirationTime('4h')
                       .sign(secert)
                       
        obj = {message: " You are sucessfully login.", result, jwt}
      } 
      else{
        obj = {message: " You are not registerd."}
      }
      res.status(200).send(obj);
}

const BulidImage = async (req, res) =>{
    fs.readFile('./images',req.params.id, function (err,data){
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.write(data);
        return res.end();
    });
}

const findProductDetails = async (req, res) =>{
    let obj; 
    const result = await GetProductDetaile();
    const secert = new TextEncoder().encode(
        'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
    )
    const reqcookies = req.cookies;
    const jwt = reqcookies.ankit;
    if(jwt !== undefined){
        try {
            const {payload, protectHeader} = await jose.jwtVerify(jwt,secert);
            console.log('payload',payload);
            console.log('protectHeader',protectHeader)
        } catch (error) {
           console.log('error',error) 
        }
    }
    else {
        obj = {message: 'Pls login again cookies not send token'}
    }
    if(result){
        obj = {message: 'Your Product List is Here', result}
    }
    else{
        obj = {message: 'Your Product list is empty'}
    }
    res.status(200).send(obj);
}

const CustomerOrderDetails = async (req, res) =>{
    let obj; 
    const Customeridparams = req.params.CustomerID;
    const secert = new TextEncoder().encode(
        'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
    )
    const reqcookies = req.cookies;
    const jwt = reqcookies.ankit;
    const {payload, protectHeader} = await jose.jwtVerify(jwt, secert);
    const Customeridtoken = payload.CustomerID;
    if(Customeridtoken == Customeridparams){
        const result = await OrderItemsDetails(Customeridparams);
        if(result){
            obj = {message: 'Your Order list is here',result}
        }
        else{
            obj = {message: 'you are not given order.'}
        }
    }
    res.status(200).send(obj);
}

export{sendData, BulidSchedule, Bulidcustomer, BulidCategory, Bulidorder, BulidOrderItem, BulidImage, Bulidproduct,Verification,findProductDetails,CustomerOrderDetails, FindSchedule, ModificationSchedule, DestorySchedule}
