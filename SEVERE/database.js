 
import pg from 'pg'
const {Pool} = pg
/** Connect   to DB*/
 
const dBConfig = {
    user:'postgres',
    password:'ankit',
    host:'localhost',
    database:'Commerec',
    port:5432 // default
}
 
const pool = new Pool(dBConfig);

pool.connect().then(()=>{
    console.log('DB connected');
}).finally(()=>{
    // console.log('DB connection closed');
    //  pool.end();
})

export default pool;