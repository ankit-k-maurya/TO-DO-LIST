import express from 'express';
import cookieParser from 'cookie-parser';
import cros from 'cors';
import bodyParser from 'body-parser';
import {sendData, BulidSchedule, Bulidcustomer, BulidCategory, Bulidorder, BulidOrderItem, BulidImage, Bulidproduct,Verification,findProductDetails,CustomerOrderDetails, FindSchedule, ModificationSchedule, DestorySchedule} from './midlwareorm.js';

const app = express();
const port = 8020;
const CorsOptions = {
    origin: 'http://localhost:3000',
    Credential: true,
    optionSuccessStatus: 200,
}

app.use(cookieParser())
app.use(bodyParser.json());

app.use(cros(CorsOptions));

app.post('/CreateSchedule',BulidSchedule,sendData)

app.get('/GetScheduleTask',FindSchedule,sendData)

app.patch('/UpdateSchedule/:ScheduleID',ModificationSchedule,sendData)

app.delete('/DeleteSchedule/:ScheduleID',DestorySchedule,sendData)

app.post('/CreateCustomer',Bulidcustomer,sendData)

app.post('/CreateCategory',BulidCategory,sendData)

app.post('/CreateProduct', Bulidproduct,sendData)

app.post('/CreateOrder',Bulidorder, sendData)

app.post('/CreateOrderItem', BulidOrderItem, sendData)

app.get('/CustomerVerification',Verification,sendData)

app.get('/Images',BulidImage, sendData)

app.get('/GetProductDetails',findProductDetails,sendData)

app.get('/GetOrderDetails',CustomerOrderDetails,sendData)


app.listen(port, () =>{
    console.log('sever is running on',port)
})