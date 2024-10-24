import { DataTypes, Model, Op } from 'sequelize'
import sequelize from './indexorm.js';

class Schedule extends Model { }

Schedule.init({
  // Model attributes are defined here
  ScheduleID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Auto incremented primary key',
  },
  Task: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  TaskDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  TaskTime: {
    type: DataTypes.TIME,
    allowNull: false,
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Schedule', // We need to choose the model name
  // timestamps:false ,
  // createdAt: false,
  // updatedAt: 'update_at',
  obj: 'Schedule',
  // paranoid:true
  // res.obj:obj

});

class Login extends Model { }

Login.init({
  // Model attributes are defined here
  EmailID: {
    type: DataTypes.STRING,
    autoIncrement: true,
    primaryKey: true,
    // allowNull: false,
  },
  Password: {
    type: DataTypes.STRING,
    // allowNull: false,
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Login', // We need to choose the model name
  timestamps: false,
  // createdAt: false,
  // updatedAt: 'update_at',
  obj: 'Login',
  // paranoid:true
  // res.obj:obj

});


class Customer extends Model { }

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
    allowNull: false,

  },
  LastName: {
    type: DataTypes.STRING,
    defaultValue: 'Singh'
    // allowNull defaults to true
  },
  EmailID: {
    type: DataTypes.STRING
  },
  Address: {
    type: DataTypes.STRING
  },
  Password: {
    type: DataTypes.STRING
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Customer', // We need to choose the model name
  timestamps: false,
  // createdAt: false,
  // updatedAt: 'update_at',
  obj: 'Customer',
  // paranoid:true
  // res.obj:obj

});

class Categories extends Model { }

Categories.init({
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
  modelName: 'Categories', // We need to choose the model name
  timestamps: false
});

class Products extends Model { }

Products.init({
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
  Price: {
    type: DataTypes.INTEGER,
  },
  StockQuantity: {
    type: DataTypes.INTEGER
  },
  Description: {
    type: DataTypes.TEXT
  },
  Image: {
    type: DataTypes.TEXT
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Products',// We need to choose the model name
  timestamps: false
});

class Orderitems extends Model { }

Orderitems.init({
  // Model attributes are defined here
  OrderItemID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Auto incremented primary key',
  },
  Quantity: {
    type: DataTypes.INTEGER,
  },
  Subtotal: {
    type: DataTypes.INTEGER
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Orderitems',// We need to choose the model name
  timestamps: false
});

class Orders extends Model { }

Orders.init({
  // Model attributes are defined here
  OrderID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Auto incremented primary key',
  },
  OrderDate: {
    type: DataTypes.DATE,
  },
  TotalAmount: {
    type: DataTypes.INTEGER
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Orders', // We need to choose the model name
  timestamps: false
});

Products.belongsTo(Categories);
Categories.hasMany(Products);
Orders.belongsTo(Customer);
Customer.hasMany(Orders);
Orderitems.belongsTo(Orders);
Orders.hasMany(Orderitems);
Orderitems.belongsTo(Products);
Products.hasMany(Orderitems);

try {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log('Connection has been established successfully.');

  var Createschedule = async (task, taskdate, tasktime) => {
    await Schedule.create(
      { Task: task, TaskDate: taskdate, TaskTime: tasktime }, { returning: false }
    )
    const result = await Schedule.findAll({
      order: [
        ['TaskDate', 'ASC'],
        ['TaskTime', 'ASC']
      ]
    });
    console.log('result:', result);
    return result;
  }

  var MakeLogin = async (emailid, password) => {
    const result = await Login.create(
      { EmailID: emailid, Password: password }
    )
    console.log('result:', result);
    return result;
  }

  var getEmailPassword = async (emailid, password) => {
    const data = await Customer.findOne({
      where: {
        EmailID: emailid,
        Password: password,
      },
    });
    console.log('Information:', data);
    return data;
  }

  var getSchedule = async () => {
    const data = await Schedule.findAll({
      order: [
        ['TaskDate', 'ASC'],
        ['TaskTime', 'ASC']
      ]
    });
    console.log('Information:', data);
    return data;
  }

  var UpdateScheduleDetail = async (scheduleid, task, taskdate, tasktime) => {
    await Schedule.update({ Task: task, TaskDate: taskdate, TaskTime: tasktime },
      {
        where: {
          ScheduleID: scheduleid
        },
        returning: false
      })
    const result = await Schedule.findAll({
      order: [
        ['TaskDate', 'ASC'],
        ['TaskTime', 'ASC']
      ]
    });

    return result;
  }

  var deleteSchedule = async (scheduleid) => {
    const data = await Schedule.destroy({
      where: {
        ScheduleID: scheduleid,
      }
    });
    console.log('data', data);
    return data;
  }

  var customer = async (firstname, lastname, emailid, address, password) => {
    const result = await Customer.create(
      { FirstName: firstname, LastName: lastname, EmailID: emailid, Address: address, Password: password }
    )
    console.log('result:', result);
    return result;
  }

  var category = async (name) => {
    const result = await Categories.create({ CategoryName: name })
    console.log('result:', result);
    return result;
  }

  var product = async (pname, price, squantity, categoryid, images) => {
    const result = await Products.create({ ProductName: pname, Price: price, StockQuantity: squantity, CategoryCategoryID: categoryid, Image: images })
    console.log('result:', result);
    return result;
  }

  var getProduct = async () => {
    const data = await Products.findAll(
      {
        attributes: [
          ['ProductID', 'ID'],
          ['ProductName', 'Name'],
          'Price', 'Description', 'Image',
          [sequelize.literal('"Category"."CategoryName"'), 'CategoryName'],
          // [sequelize.fn('max', sequelize.col('CategoryName')), 'DESC'],
        ],
        include: [{
          model: Categories,
          required: true,
          attributes: [],
        }],
      }
    );
    console.log('Information:', data);
    return data;
  }

  var UpdateProductDetails = async (productid, productname, price, quantity, categoryid) => {
    const data = await Products.update({ ProductName: productname, Price: price, StockQuantity: quantity, CategoryCategoryID: categoryid }, {
      where: {
        ProductID: productid,
      }
    });
    console.log('data', data);
    return data;
  }
  var order = async (odate, tamount, customerid) => {
    const result = await Orders.create({ OrderDate: odate, TotalAmount: tamount, CustomerCustomerID: customerid })
    console.log('results:', result);
    return result;
  }
  var orderitem = async (orderid, productid, quantity, subtotal) => {
    const result = await Orderitems.create({ Quantity: quantity, Subtotal: subtotal, OrderOrderID: orderid, ProductProductID: productid })
    console.log('results:', result);
    return result;
  }
  var getCustomer = async () => {
    const data = await Customer.findAll({
      order: [
        // Customer.CustomerID
        ['CustomerID', 'ASC'],
        // Will order by max(age)
        // sequelize.fn('max', sequelize.col('CustomerID'),'DESC'),
      ]
    });
    console.log('Information:', data);
    return data;
  }
  var getOneCustomer = async (customerid) => {
    const data = await Customer.findOne({
      where: {
        CustomerID: customerid
      }
    });
    console.log('Data:', data);
    return data;
  }
  var UpdateCustomerDetail = async (customerid, firstname, lastname, emailid, address) => {
    const data = await Customer.update({ FirstName: firstname, LastName: lastname, EmailID: emailid, Address: address }, {
      where: {
        CustomerID: customerid
      }
    });
    console.log('data', data);
    return data;
  }
  var deletecustomer = async (customerid) => {
    const data = await Customer.destroy({
      where: {
        CustomerID: customerid
      }
    });
    console.log('data', data);
    return data;
  }
  var OrerDetaile = async () => {
    const result = await sequelize.query(`SELECT
    "Customers"."CustomerID" AS CID,
    CONCAT("Customers"."FirstName", '', "Customers"."LastName") AS FULLNAME,
    STRING_AGG(DISTINCT "Products"."ProductName",',') AS PRODUCTNAME
    FROM "Orders"
    INNER JOIN "Orderitems" ON "Orders"."OrderID" = "Orderitems"."OrderOrderID"
    INNER JOIN "Customers" ON "Orders"."CustomerCustomerID" = "Customers"."CustomerID"
    INNER JOIN "Products" ON "Orderitems"."ProductProductID" = "Products"."ProductID"
    GROUP BY "Customers"."CustomerID", CONCAT("Customers"."FirstName", '', "Customers"."LastName")
    ORDER BY "Customers"."CustomerID"
  `)
    return result;
  }
  var Purchase = async (CustomerID) => {
    const query = (`
SELECT 
    CONCAT("Customers"."FirstName", '', "Customers"."LastName") AS FULLNAME,
    STRING_AGG(DISTINCT "Products"."ProductName", ',') AS PRODUCTNAME,
SUM("Orderitems"."Quantity")AS Quantity,
    SUM("Orderitems"."Subtotal") AS SUMAmount
FROM "Orders"
      INNER JOIN "Orderitems" ON "Orders"."OrderID" = "Orderitems"."OrderOrderID"
      INNER JOIN "Customers" ON "Orders"."CustomerCustomerID" = "Customers"."CustomerID"
      INNER JOIN "Products" ON "Orderitems"."ProductProductID" = "Products"."ProductID"
WHERE ("Customers"."CustomerID" =${CustomerID})
GROUP BY "ProductName", CONCAT("Customers"."FirstName", '', "Customers"."LastName")
`)
    const result = await sequelize.query(query);
    return result;
  }
  var ORMPurchase = async (CustomerID) => {
    /* const result = Customer.findAll({
       attributes: [
         ['CustomerID', 'CID'],
         [sequelize.fn('CONCAT', sequelize.literal('"Customer"."FirstName"'),
          '', sequelize.literal('"Customer"."LastName"')), 'FULLNAME'],
          [sequelize.fn('STRING_AGG', sequelize.literal('DISTINCT "Products"."ProductName"'), ','), 'PRODUCTNAME'],
       [sequelize.fn('SUM', sequelize.col('"Orderitems"."Subtotal"')), 'SUMAmount']
     ],
       include:[{
         model:Orders,
         required:true,
         attributes:[], 
       }],
       include:[{
         model:Products,
         required:true,
         attributes:[`"Products"."ProductName"`],
       }],
       
       where:{
         CustomerID: CustomerID
       }
     });*/

    const result = await Orders.findAll({
      attributes: [
        ['CustomerID', 'CID'],
        [sequelize.fn('CONCAT', sequelize.literal('"Customer"."FirstName"'), '', sequelize.literal('"Customer"."LastName"')), 'FULLNAME'],
        [sequelize.fn('STRING_AGG', sequelize.literal('DISTINCT "Products"."ProductName"'), ','), 'PRODUCTNAME'],
        [sequelize.fn('SUM', sequelize.col('"Orderitems"."Subtotal"')), 'SUMAmount']
      ],
      include: [
        {
          model: Customer,
          attributes: [],
          required: true,
        },
        {
          model: Orderitems,
          attributes: [],
          include: [
            {
              model: Products,
              attributes: [],
              required: true // INNER JOIN
            }
          ],
          required: true,
        },
      ],
      where: {
        [Op.and]: [
          sequelize.literal('"Customer"."CustomerID" = customerID'),
          { customerID: CustomerID }
        ]
      },
      group: [
        sequelize.literal('"Customer"."CustomerID"'),
        sequelize.fn('CONCAT', sequelize.literal('"Customer"."FirstName"'), '',
          sequelize.literal('"Customer"."LastName"'))
      ],
      order: [
        ['CustomerID']
      ]
    });

    return result;
  }

} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export { getEmailPassword, MakeLogin, UpdateProductDetails, Createschedule, getSchedule, UpdateScheduleDetail, deleteSchedule, getProduct, customer, getCustomer, getOneCustomer, deletecustomer, UpdateCustomerDetail, OrerDetaile, Purchase, ORMPurchase, category, product, order, orderitem }