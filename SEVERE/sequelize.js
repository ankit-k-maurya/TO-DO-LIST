import {Sequelize,DataTypes,Model} from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'postgres',
    username: 'postgres',
    password:'ankit',
    host: 'localhost',
    port:5432,
    database:'Librarymanagement'
  });

  const Member = sequelize.define('Member', {
    // Model attributes are defined here
   MemberID: {
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
    },
    PhoneNO:{
        type:DataTypes.STRING
    }
  }, {
    // Other model options go here
  });

class Author extends Model {}

Author.init({
  // Model attributes are defined here
  AuthorID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Auto incremented primary key',
  },
  FirstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  SurName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
 BirthDate:{
    type:DataTypes.DATE
 } ,
 Nationality:{
    type:DataTypes.STRING
 }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Author' // We need to choose the model name
});


class Book extends Model {}

Book.init({
  // Model attributes are defined here
  BookID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Auto incremented primary key',
  },
  Title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ISBN: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
 Genration:{
    type:DataTypes.STRING
 } ,
 QuantityAvailable:{
    type:DataTypes.INTEGER
 },
 AuthorID:{
    type:DataTypes.INTEGER,
    forgeinkey:true
 }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Book' // We need to choose the model name
});

class Borrowedbook extends Model {}

Borrowedbook.init({
  // Model attributes are defined here
  BorrowID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Auto incremented primary key',
  },
  MemberID: {
    type: DataTypes.INTEGER,
    forgeinkey:true
  },
  BookID: {
    type: DataTypes.INTEGER,
    forgeinkey: true
    // allowNull defaults to true
  },
 BorrowDate:{
    type:DataTypes.DATE
 } ,
 ReturnDate:{
    type:DataTypes.DATE
 }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Borrowedbook' // We need to choose the model name
});
/*
Borrowedbook.Member = Borrowedbook.belongsTo(Member);
Borrowedbook.Book = Borrowedbook.belongsTo(Book);
Author.Book = Author.belongsTo(Book);
*/
  try {
    await sequelize.authenticate();
  await sequelize.sync();
    console.log('Connection has been established successfully.');
    let borrowedbook = await Borrowedbook.create({MemberID:"5", BookID:"5",BorrowDate:"2023-12-10",ReturnDate:"2023-12-31" });
  console.log(borrowedbook);
  // const member = await Member.findAll({
    // where:{
      // MemberID:1
    // }
  // });
    //  console.log(member);
} catch (error) {
    console.error('Error:', error);
  }
  // Create a new user
 
  