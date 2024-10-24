import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'postgres',
    username: 'postgres',
    password: 'your-password',
    host:'localhost',
    port:5432,
    logging:false,
    database:'E-Mart'
})

export default sequelize;