import pool from './database.js';
const GetAllUserServise = async()=>{
    const result = await pool.query('SELECT * FROM customer')
    return result;
}
const GetOneUserServise = async(customerid) =>{
    const result = await pool.query(`SELECT * FROM customer WHERE customerid = ${customerid}`)
    return result;
}
const GetUserDetailServise = async(firstname, lastname, emailid, address)=>{
    const result = await pool.query(`INSERT INTO customer ( FirstName, LastName, EmailID, Address) VALUES ('${firstname}','${lastname}','${emailid}','${address}')`)
    return result;
}
const GetUserDataUpdateServise = async(customerid,firstname,lastname,emailid,address) =>{
    const result = await pool.query(`UPDATE customer SET firstname ='${firstname}',lastname ='${lastname}',emailid = '${emailid}',address = '${address}'  where customerid= ${customerid}`);
    return result;
}
const RemoveDataServise = async (customerid) =>{
    const result = await pool.query(`DELETE FROM customer WHERE customerid = ${customerid}`);
    return result;
}
const GetCustomerServise = async (customerid,firstname,lastname,emailid,address) =>{
    let where = 'WHERE'
    let condition = false;
    if(firstname) {
       
        where = `${where} firstname = '${firstname}'`; /* WNERE firstname =  'Ankit'*/
        condition = true;
    }
    if(lastname){
        if(condition){
            where = `${where} AND lastname= '${lastname}'`;
        }
        else {where = `${where} lastname= '${lastname}'`}
        condition = true;
    }
    if(emailid){
        if(condition){
            where = `${where} AND emailid= '${emailid}'` /** WNERE firstname =  'Ankit' AND email = '2@b.com'*/
        }
        else {where = `${where} emailid= '${emailid}'`}
        condition = true;
    }
    if(address){
        if(condition){
            where = `${where} AND address= '${address}'` /** WNERE firstname =  'Ankit' AND email = '2@b.com'*/
        }
        else {where = `${where} address= '${address}'`}
        condition = true;
    } 
    if(!condition)
    {
        where='';
    }
    console.log('Where:',where);
   const Query = await pool.query( `SELECT * FROM customer ${where}`);
   return Query;
}
export{ GetCustomerServise,GetAllUserServise,GetOneUserServise,GetUserDetailServise,GetUserDataUpdateServise,RemoveDataServise}