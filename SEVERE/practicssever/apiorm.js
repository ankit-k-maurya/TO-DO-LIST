import express from 'express';
import cookieParser from 'cookie-parser';
import cros from 'cors';
import bodyParser from 'body-parser';
import {sendData,BulidSchedule,getScheduleDetails,UpdateScheduleDetail,deleteSchedule} from './midlwareorm.js';
// import { DELETE } from 'sequelize/lib/query-types';

const app = express ();
const port = 8000;
app.use(bodyParser.json());
const CorsOptions = {
    origin: 'http://44.201.210.147:3000',
    credentials: true,
    optionSuccessStatus:200,
    methods:['GET', 'PATCH', 'POST', 'DELETE']
}

app.use(cookieParser())
app.use (cros(CorsOptions))

console.log( 'res',CorsOptions)

app.post('/CreateSchedule',BulidSchedule,sendData)

app.get('/GetSchedule',getScheduleDetails,sendData)

app.patch('/UpdateSchedule/:ScheduleID',UpdateScheduleDetail,sendData)

app.delete('/DeleteSchedule/:ScheduleID',deleteSchedule,sendData)

app.listen(port, () =>{
    console.log('sever is running on',port)
});
