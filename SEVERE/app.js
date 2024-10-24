//app.js
 
 
import express from 'express';
import pool from './db.js';
 
const app = express();
const port = 8001;
 
 app.use(express.json());
app.get('/customer',(req,res)=>{
    res.send('Hello!!');
})
 
const createUser = async (req,res,next)=>{
    /** Create user */
    const  user = {
        customerid: customer.length+1,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        emailid:req.body.emailid,
        address:req.body.address
    }
    customer.push(user)
    res.json(user)
}
app.post('/customer',createUser,async (res,rep,next)=>{
    /** You have to create customer*/
    rep.status(201).send('user created');
})
 
 
const getdata = async (req,res,next)=>{
    const {rowCount,rows} = await pool.query('SELECT * customer')
    console.log('Valu : ',rowCount , rows);
    res.send(`You have total ${rowCount} social user`);
    res.count = rowCount;
    next()
}
 
 
app.get('/abc',getdata,async (req,res)=>{
   
    res.send(`You have total ${rowCount} social user`);
})
 
app.listen(port,()=>{
    console.log('Server is running on ',port);
});
