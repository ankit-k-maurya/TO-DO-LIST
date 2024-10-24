/** DB connection */
 
const {Pool} = require('pg');
 
/** Connect   to DB*/
 
const dBConfig = {
    user:'postgres',
    password:'ankit',
    host:'localhost',
    database:'Commerec',
    port:5432 // default
}
 
const pool = new Pool(dBConfig);
 
pool.connect().then(async()=>{
    console.log('DB connected');
    const {rowCount,rows} = await pool.query('SELECT * FROM customer')
    console.log('Valu : ',rowCount , rows);
}).finally(()=>{
    console.log('DB connection closed');
    pool.end();
})
 
