import { Sequelize} from 'sequelize'
// import {Createcustomer,Createcategory,CreateProduct,CreateOrderitem,CreateOrder} from './midlwareorm';
// const sequelize = new Sequelize('postgres://postgres:ankit@localhost:5432/Commerec') 
const sequelize = new Sequelize({
  dialect: 'postgres',
  username: 'postgres',
  password: 'ankit',
  host: 'localhost',
  port: 5432,
  logging: false,
  database: 'postgres'
});
export default sequelize;
/*
try {
  await sequelize.authenticate();
  // await sequelize.sync({ alter: true });
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Createcustomer = (DataTypes,Model,sequelize)
db.Createcategory = (DataTypes,Model,sequelize)
db.CreateProduct = (DataTypes,Model,sequelize)
db.CreateOrderitem = (DataTypes,Model,sequelize)
db.CreateOrder = (DataTypes,Model,sequelize);

// db.sequelize.sync({ alter: true });
// module.exports.db */
