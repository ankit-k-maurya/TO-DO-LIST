import express from 'express';
import cookieParser from 'cookie-parser';
import cros from 'cors';
import bodyParser from 'body-parser';
import {Verification, BulidLogin, BulidImage, getProductDetails, UpdateProduct, DeletedSchedule, UpdateSchedule, getScheduleDetails, BulidSchedule, BulidOrderItem, Bulidorder, Bulidproduct, BulidCategory, getCustomerDetails, BuyItem, ORMBuyItem, Orders, SendData, getOneCustDetails, Bulidcustomer, UpdateCustomer, Deleted } from './models/midlwareorm.js';

const app = express();
const port = 8010;
app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cookieParser())

app.use(cros(corsOptions))

console.log('res', corsOptions)

app.post('/MakeLogin', BulidLogin, SendData)

app.post('/getEmailPassword', Verification, SendData)

app.get('/getProduct', getProductDetails, SendData)

app.patch('/UpdateProductDetails/:ProductID', UpdateProduct, SendData)

app.post('/Createschedule', BulidSchedule, SendData)

app.get('/getSchedule', getScheduleDetails, SendData)

app.patch('/UpdateScheduleDetail/:ScheduleID', UpdateSchedule, SendData)

app.delete('/deleteSchedule/:scheduleid', DeletedSchedule, SendData)

app.get('/customers', getCustomerDetails, SendData)

app.get('/customers/:customerid', getOneCustDetails, SendData)

app.patch('/customers/:customerid', UpdateCustomer, SendData)

app.delete('/customers/:customerid', Deleted, SendData)

app.post('/customer', Bulidcustomer, SendData)

app.post('/category', BulidCategory, SendData)

app.post('/product', Bulidproduct, SendData)

app.post('/orderitem', BulidOrderItem, SendData)

app.post('/order', Bulidorder, SendData)

app.get('/orderitem', Orders, SendData)

app.get('/hello/:id', BulidImage)

app.get('/orderitem/:customerid', BuyItem, SendData)

app.get('/ORMorderitem/:customerid', ORMBuyItem, SendData)

app.listen(port, () => {
  console.log('Server is running on ', port);
});