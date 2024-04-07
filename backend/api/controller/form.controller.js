const { formService } = require("../sevices");


///create form
const saveForm = async(req, res) => {
    const result = await formService.saveFormData(req.body);
    res.send(result);
};

const getForms = async(req, res) => {
    const result = await formService.getAllForms();
    res.send(result);
};
const getResult = async(req, res) => {
	console.log("getResult>>>>");
    const result = await formService.getAllResult();
	console.log(result);
    res.send(result);
};
//create respone form
const getFormById = async(req, res) => {
	console.log("getFormById>>>>");
    const result = await formService.getFormById(req.query.id);
	console.log(result);
    res.send([result]);
};

const saveResponse = async(req, res) => {
	console.log("saveResponse>>>>");
    const result = await formService.saveResponse(req.body);
    res.send(result);
};

const getTotalResponseCount = async(req, res) => {
    const result = await formService.getTotalResponseCount();
    res.send(result);
};

//save user
const saveUser = async(req, res) => {
	console.log("saveUser");
    const result = await formService.saveUserData(req.body);
    res.send(result);
};
const getUsers = async(req, res) => {
	console.log("getUsers");
    const result = await formService.getAllUsers();
    res.send(result);
};

//save class
const saveClass = async(req, res) => {
    const result = await formService.saveClassData(req.body);
    res.send(result);
};
const getClasses = async(req, res) => {
	console.log("getClasses");
    const result = await formService.getAllClasses();
    res.send(result);
};

module.exports = {
    saveForm,
    getForms,
    getFormById,
    saveResponse,
    getTotalResponseCount,
    saveUser,
    getUsers,
	saveClass,
	getClasses,
	getResult,
};