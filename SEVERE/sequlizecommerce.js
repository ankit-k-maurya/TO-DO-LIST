import {Sequelize,DataTypes, Model} from 'sequelize'
// const sequelize = new Sequelize('postgres://postgres:ankit@localhost:5432/Commerec') 
const sequelize = new Sequelize({
  dialect: 'postgres',
  username: 'postgres',
  password:'ankit',
  host: 'localhost',
  port:5432,
  database:'postgres'
});

class Customer extends Model {}

Customer.init({
  // Model attributes are defined here
  CustomerID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Auto incremented primary key',
  },
  FirstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  LastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
 EmailID:{
    type:DataTypes.STRING
 } ,
 Address:{
    type:DataTypes.STRING
 }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Customer' // We need to choose the model name
});

class Category extends Model {}

Category.init({
  // Model attributes are defined here
  CategoryID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Auto incremented primary key',
  },
  CategoryName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Category' // We need to choose the model name
});

class Product extends Model {}

Product.init({
    // Model attributes are defined here
    ProductID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: 'Auto incremented primary key',
    },
    ProductName: {
      type: DataTypes.STRING,
      allowNull: false
    },
   Price:{
    type: DataTypes.INTEGER,
   },
  StockQuantity:{
    type:DataTypes.INTEGER
  }, 
  CategoryID:{
    type:DataTypes.INTEGER,
    forgeinkey:true
  } 
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Product' // We need to choose the model name
  });

  class Orderitem extends Model {}

  Orderitem.init({
      // Model attributes are defined here
      OrderItemID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Auto incremented primary key',
      },  
     OrderID:{
      type: DataTypes.INTEGER,
      forgeinkey:true
     },
    ProductID:{
      type:DataTypes.INTEGER,
      forgeinkey:true
    }, 
    Quantity:{
      type:DataTypes.INTEGER,
    } ,
    Subtotal:{
        type:DataTypes.INTEGER
    }
    }, {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: 'Orderitem' // We need to choose the model name
    });  

   class Order extends Model{}

    Order.init({
        // Model attributes are defined here
        OrderID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          comment: 'Auto incremented primary key',
        },  
       OrderDate:{
        type: DataTypes.DATE,
       },
      TotalAmount:{
        type:DataTypes.INTEGER
      }, 
      CustomerID:{
        type:DataTypes.INTEGER,
        forgeinkey:true,
        references: {
          model: Customer, // 'Movies' would also work
          key: 'CustomerID'
        }

      } 
      }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'Order' // We need to choose the model name
      }); 

      Product.belongsTo(Category);
      Order.belongsTo(Customer);
      Customer.hasMany(Order);
     Orderitem.belongsTo(Order);
    Orderitem.belongsTo(Product);
    
try {
    await sequelize.authenticate();
    await sequelize.sync({alter:true});
    console.log('Connection has been established successfully.');
/* many values inserted
    let customer = await Customer.bulkCreate(
   [ {FirstName:"Avinash",LastName:"Kumar",EmailID:"Avinsh98@gmail.com", Address:"Delhi"},
   { FirstName:"Naunit",LastName:"Kumar",EmailID:"Naunit98@gmail.com", Address:"Mumbai"}])
    console.log(customer);
    let order = await Order.bulkCreate(
      [ {OrderDate:"2023-12-25",TotalAmount:"46000",CustomerID:"3",CustomerCustomerID:"3"},
      { OrderDate:"2023-11-05",TotalAmount:"82000",CategoryID:"1",CustomerCustomerID:"1"}])
      */
      const data = await Customer.findAll();
      console.log('Information:',data);
      // return data;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }