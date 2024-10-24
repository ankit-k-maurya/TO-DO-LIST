import pool from './apidbc.js';

const GetProductlist =async () => {
    const result = await pool.query('SELECT categoryname FROM category')
    console.log('result:',result)
    return result;
}

const  GetProductDetaile =async (productid) => {
  console.log('productid:',productid)
    const result = await pool.query(`SELECT * FROM product WHERE productid = ${productid}`)
    console.log('result:',result)
    return result;
}

const  getProductDetails = async(productid)=>{
  const result = await pool.query(`SELECT * FROM product WHERE productid = ${productid}`)
  return result;
}

const  createOrder = async(customerid,date,totalPrice)=>{
  const query = (`INSERT INTO orders ( CustomerID,OrderDate,TotalAmount ) VALUES (${customerid},'${date}',${totalPrice})  RETURNING orderid`)
  console.log('result:',query);
  const result = await pool.query(query)
  console.log('results:',result);
  return result;
}
const createOrderItem = async(orderid,productid,quantity,subtotal)=>{
  const result = await pool.query(`INSERT INTO orderitem ( orderid,productid,quantity,subtotal ) VALUES (${orderid},${productid},${quantity},${subtotal})`)
   return result;
}
const OrerDetaile =async () => {
    const result = await pool.query(`SELECT
    customer.customerid AS CID,
    CONCAT(customer.FirstName, '', customer.LastName) AS FULLNAME,
    STRING_AGG(DISTINCT product.ProductName ,',') AS PRODUCTNAME
    FROM orders
    INNER JOIN orderitem ON orders.OrderID = orderitem.OrderID
    INNER JOIN customer ON orders.CustomerID = customer.CustomerID
    INNER JOIN product ON orderitem.ProductID = product.ProductID
    GROUP BY customer.CustomerID, CONCAT(customer.FirstName, '', customer.LastName)
    ORDER BY customer.CustomerID
  `)
    return result;
}

const  Purchase =async (customerid) => {
    const query = (`SELECT
    customer.customerid AS CID,
    CONCAT(customer.FirstName, '', customer.LastName) AS FULLNAME,
    STRING_AGG(DISTINCT product.ProductName,',') AS PRODUCTNAME,
    SUM(orderitem.Subtotal) AS SUMAmount
  FROM orders
  INNER JOIN orderitem ON orders.OrderID = orderitem.OrderID
  INNER JOIN customer ON orders.CustomerID = customer.CustomerID
  INNER JOIN product ON orderitem.ProductID = product.ProductID
  GROUP BY customer.CustomerID, CONCAT(customer.FirstName, '', customer.LastName) HAVING(customer.customerid =${customerid})
  ORDER BY customer.CustomerID;
  `) 
  const result = await pool.query(query);
    return result;
}

export{ GetProductlist,GetProductDetaile,OrerDetaile, Purchase,getProductDetails,createOrder, createOrderItem}