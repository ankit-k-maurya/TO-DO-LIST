/*import express from 'express';
import bodyParser from 'body-parser';
import{getOneCust,getdata,CreateUser,UpdateCustomerDetail,Deleted,EditCustomerDetails,SendData}from './midelware.js'
const app = express();
const port = 8001;
app.use(bodyParser.json());

app.get('/customers', getdata,SendData)

app.get('/customers/:customerid', getOneCust, SendData)

app.post('/customer',CreateUser, SendData)

app.put('/customer/:customerid', UpdateCustomerDetail, SendData)

app.delete('/customer/:customerid', Deleted, SendData)

app.patch('/customer/:customerid',EditCustomerDetails,SendData)

/*app.post('/customer',async (res,rep,next)=>{
    /** You have to create customer
    // const {rowCount,rows} = await pool.query('INSERT INTO customer Values (10,"ROhan","kumar","rohan@gmail.com","GOA")')
    console.log('Valu : ',rowCount , rows);
    const obj = {message:`You have total ${rowCount} social user`,data:rows}
    res.send(obj);
    next();
    rep.status(201).send('user Updated',obj);
})
 
app.get('/customer',async(req,res)=>{
   const {rowCount,rows} = await pool.query('SELECT * from customer')
    console.log('Valu : ',rowCount , rows);
    const obj = {message:`You have total ${rowCount} social user`,data:rows}
    res.send(obj);
})*/

/*app.listen(port, () => {
      console.log('Server is running on ', port);
});
*/