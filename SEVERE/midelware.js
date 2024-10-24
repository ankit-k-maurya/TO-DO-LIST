import { GetCustomerServise, GetAllUserServise, GetOneUserServise, GetUserDetailServise, GetUserDataUpdateServise, RemoveDataServise } from './servises.js'

const getdata = async (req, res, next) => {
    const { rowCount, rows } = await GetAllUserServise();
    console.log('Valu : ', rowCount, rows);
    const obj = { message: `You have total ${rowCount} Customer`, data: rows }
    res.obj = obj;
    next()
}
const SendData = (req, res) => {
    res.send(res.obj);
}

const getOneCust = async (req, res, next) => {
    let message, OBJ;
    const customerid = req.params.customerid
    const { rowCount, rows } = await GetOneUserServise(customerid);
    if (rowCount > 0) {
        OBJ = { message: `You searching Customer data is:`, data: rows }
    }
    else {
        message = "You are searching Customer data is not found :"
    }
    res.status(201).send({ OBJ, message });//how to send multiple value in send method:
    res.count = rowCount;
    next()
}
const CreateUser = async (req, res, next) => {
    let message;
    const { firstname, lastname, emailid, address } = req.body;
    const { rowCount, rows } = await GetUserDetailServise(firstname, lastname, emailid, address);
    if (rowCount > 0) {
        message = "Customer is successfully Registerd";
    }
    else {
        message = "you are not registerd";
    }
    res.status(201).send(message);
    res.count = rowCount;
    next()

}

const UpdateCustomerDetail = async (req, res, next) => {
    const customerid = req.params.customerid;
    const { firstname, lastname, emailid, address } = req.body;
    const { rowCount, rows } = await GetUserDataUpdateServise(customerid, firstname, lastname, emailid, address);
    const OBJ = { message: `Your customer Details Updated Successfully  ${rowCount} data`, data: rows }
    res.obj = OBJ;
    next();
}

const Deleted = async (req, res, next) => {
    const customerid = req.params.customerid;
    const { rowCount, rows } = await RemoveDataServise(customerid);
    const OBJ = { message: `You are successfully remove from customer ${rowCount} data`, data: rows }
    res.obj = OBJ;
    next();
}
const EditCustomerDetails = async (req, res, next) => {
    const customerid = req.params.customerid;
    const { firstname, lastname, emailid, address } = req.body;
    const { rowCount, rows } = await GetCustomerServise(customerid, firstname, lastname, emailid, address);
    const obj = { message: `Your Customer data is successfully Updated ${rowCount} `, data: rows }
    res.obj = obj;
    next();
}
export { getOneCust, getdata, CreateUser, UpdateCustomerDetail, Deleted, EditCustomerDetails, SendData }

