import {Sequelize,DataTypes} from 'sequelize'
// const sequelize = new Sequelize('postgres://postgres:ankit@localhost:5432/Commerec') 
const sequelize = new Sequelize({
  dialect: 'postgres',
  username: 'postgres',
  password:'ankit',
  host: 'localhost',
  port:5432,
  database:'Commerec'
});
const User = sequelize.define('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Auto incremented primary key',
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true
User.sync();

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }