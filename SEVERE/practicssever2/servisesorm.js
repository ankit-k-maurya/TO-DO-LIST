import { Model, DataTypes, Op, BelongsTo } from "sequelize";
import sequelize from "./indexorm.js";

class Schedule extends Model { }

Schedule.init({
    ScheduleID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Task: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    TaskDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    TaskTime: {
        type: DataTypes.TIME,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Schedule',
    obj: 'Schedule',
    timestamps: false
});

class Customer extends Model { }

Customer.init({
    Quantity: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    EmailID: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Address: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Customer',
    obj: 'Customer',
    timestamps: false
});

class Categories extends Model { }

Categories.init({
    CategoriesID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    CategoriesName: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    sequelize,
    modelName: 'Categories',
    obj: 'Categories',
    timestamps: false
});

class Product extends Model { }

Product.init({
    ProductID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    ProductName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    StokQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Image: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Product',
    obj: 'Product',
    timestamps: false
});

class Order extends Model { }

Order.init({
    OrderID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    OrderDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Order',
    obj: 'Order',
    timestamps: false
});

class OrderItem extends Model { }

OrderItem.init({
    OederItemID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    SubTotal: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'OrderItem',
    obj: 'OrderItem',
    timestamps: false
});

Product.belongsTo(Categories);
Categories.hasMany(Product);
Order.belongsTo(Customer);
Customer.hasMany(Order);
OrderItem.belongsTo(Order);
Order.hasMany(OrderItem);
OrderItem.belongsTo(Product);
Product.hasMany(OrderItem);

try {
    sequelize.authenticate();
    sequelize.sync({ alter: true });
    console.log('Conection has been stablised sucessfully');

    var Createschedule = async (Task, TaskDate, TaskTime) => {
        await Schedule.create({ Task: Task, TaskDate: TaskDate, TaskTime: TaskTime });
        const result = Schedule.findAll({
            order: [['TaskDate', 'ASC'], ['TaskTime', 'ASC']]
        });
        return result;
    }

    var getSchedule = async () => {
        const result = await Schedule.findAll({
            order: [['TaskDate', 'ASC'], ['TaskTime', 'ASC']]
        });
        return result;
    }

    var UpdateSchedule = async (Task, TaskDate, TaskTime) => {
        console.log('Task, TaskDate, TaskTime',Task, TaskDate, TaskTime)
        await Schedule.update({
            Task: Task, TaskDate: TaskDate, TaskTime: TaskTime
        });
        const result = await Schedule.findAll({
            order: [['TaskDate', 'ASC'], ['TaskTime', 'ASC']]
        });
        return result;
    }

    var DeletedSchedule = async (ID) => {
        const result = await Schedule.destroy({
            where: { ScheduleID: ID }
        });
        return result;
    }

    var CreateCustomer = async (FirstName, LastName, EmailID, Password, Address) => {
        const result = await Customer.create({
            FirstName: FirstName, LastName: LastName, EmailID: EmailID, Password: Password, Address: Address
        });
        return result;
    }

    var CreateCategoriesName = async (CategoriesName) =>{
        const result = await Categories.create({CategoriesName: CategoriesName});
        return result;
    }

    var CreateProduct = async (ProductName, Price, StockQuantity,Description, Images) => {
        const result = await Customer.create({
            ProductName: ProductName, Price: Price, StockQuantity: StockQuantity,Description:Description, Images: Images
        });
        return result;
    }

    var CreateOrder = async (OrderDate, Amount,CustomerID ) => {
        const result = await Customer.create({
            OrderDate: OrderDate, Amount: Amount, CustomerCustomerID: CustomerID
        });
        return result;
    }

    var CreateOrderitem = async (ProductID, SubTotal,Quantity,OrderID ) => {
        const result = await Customer.create({
            ProductProductID: ProductID, SubTotal: SubTotal, Quantity: Quantity, OrderOrderID: OrderID
        });
        return result;
    }

    var CustomerVerification = async (EmailID, Password) =>{
        const result = await Customer.findOne({
            where:{
                EmailID: EmailID,
                Password: Password
            }
        });
        return result;
    }

    var GetProductDetaile = async () =>{
      const result = await Product.findAll({
        attributes: [
            ['ProductID', 'ID'],
            ['ProductName','Name'],
            'Images', 'StockQuantity', 'Price',
           [sequelize.literal("'Categories.'CategoriesName"),'CategoriesName']
    ],
    include:[{
        model: Categories,
        required: true,
        attributes: []
      }]             
      });
      return result;
    }

    var OrderItemsDetails = async (CustomerID) =>{
        const query = (`
            SELECT CONCAT("Customers"."FirstName", '', "Customers"."LastName") AS FULLNAME,
       STRING_AGG(DISTINCT "Products"."ProductName", ',')          AS PRODUCTNAME,
   SUM("OrderItems"."Quantity")AS Quantity,
       SUM("OrderItems"."SubTotal")                                AS SUMAmount
FROM "Orders"
         INNER JOIN "OrderItems" ON "Orders"."OrderID" = "OrderItems"."OrderOrderID"
         INNER JOIN "Customers" ON "Orders"."CustomerCustomerID" = "Customers"."CustomerID"
         INNER JOIN "Products" ON "OrderItems"."ProductProductID" = "Products"."ProductID"
WHERE ("Customers"."CustomerID" = ${CustomerID})
GROUP BY "ProductName", CONCAT("Customers"."FirstName", '', "Customers"."LastName")
 `)
 const result = await sequelize.query(query);
 return result;
    }
} catch (error) {
    console.log('Conection has been not stablised', error)
}

export {Createschedule,getSchedule,UpdateSchedule,DeletedSchedule,CreateCustomer,CreateCategoriesName,CreateProduct,CreateOrder,CreateOrderitem,GetProductDetaile,OrderItemsDetails,CustomerVerification}