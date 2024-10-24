import express from 'express';
import bodyParser from 'body-parser';
import{getOneCust,getdata,CreateUser,UpdateCustomerDetail,Deleted,EditCustomerDetails,SendData}from './midelware.js'
import {Getdata,sendData,Products,Orders,BuyItem,cgetdata,pgetdata} from './apimedlware.js';
const app = express();
const port = 8001;
app.use(bodyParser.json());

app.get('/customers', getdata,SendData)

app.get('/customers/:customerid', getOneCust, SendData)

app.post('/customer',CreateUser, SendData)

app.put('/customer/:customerid', UpdateCustomerDetail, SendData)

app.delete('/customer/:customerid', Deleted, SendData)

app.patch('/customer/:customerid',EditCustomerDetails,SendData)

app.get('/category', Getdata,sendData)

app.get('/product/:productid', Products,sendData)

app.get('/orderitem', Orders,sendData)

app.post('/orderitem/:customerid',BuyItem,sendData)

app.post('/calculateTotalPrice',cgetdata,SendData)

app.post('/purchase',pgetdata,SendData)

app.listen(port, () => {
    console.log('Server is running on ', port);
});