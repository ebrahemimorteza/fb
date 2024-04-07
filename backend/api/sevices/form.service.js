const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const FORM_DATA_FILE_URL = "./data/forms.json";
const CLASS_DATA_FILE_URL = "./data/class.json";
const USER_DATA_FILE_URL = "./data/user.json";
const FORM_RESPONSE_FILE_URL = "./data/responses.json";

// اتصال به مونگو دی‌بی
mongoose.connect('mongodb://localhost:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connect is successful');

        // در اینجا می‌توانید عملیات دیگری روی دیتابیس انجام دهید
    })
    .catch((error) => {
        console.error('خطا در اتصال به مونگو دی‌بی:', error);
    });

// تعریف ساختار داده فرم
const FormDataSchema = new mongoose.Schema({
  url: String,
  formJson: Object,
  date: String,
});

// تعریف ساختار داده کلاس
const ClassDataSchema = new mongoose.Schema({
  url: String,
  formJson: Object,
  date: String,
});

// تعریف ساختار داده کاربر
const UserDataSchema = new mongoose.Schema({
  url: String,
  formJson: Object,
  date: String,
});

// تعریف ساختار داده پاسخ‌ها
const ResponseDataSchema = new mongoose.Schema({
  id: String,
  number: String,
  formJson: Object,
  response: Object,
});

// تعریف مدل داده فرم
const FormDataModel = mongoose.model("FormData", FormDataSchema);

// تعریف مدل داده کلاس
const ClassDataModel = mongoose.model("ClassData", ClassDataSchema);

// تعریف مدل داده کاربر
const UserDataModel = mongoose.model("UserData", UserDataSchema);

// تعریف مدل داده پاسخ‌ها
const ResponseDataModel = mongoose.model("ResponseData", ResponseDataSchema);

const saveFormData = async (formJson) => {
  try {
    const url = uuidv4();
    const date = new Date().toLocaleString();

    const formData = new FormDataModel({ url, formJson, date });
    await formData.save();

    return url;
  } catch (error) {
    console.error("خطا در ذخیره داده فرم:", error);
  }
};

const saveClassData = async (formJson) => {
  try {
    const url = uuidv4();
    const date = new Date().toLocaleString();

    const classData = new ClassDataModel({ url, formJson, date });
    await classData.save();

    return url;
  } catch (error) {
    console.error("خطا در ذخیره داده کلاس:", error);
  }
};

const saveUserData = async (formJson) => {
  try {
    const url = uuidv4();
    const date = new Date().toLocaleString();

    const userData = new UserDataModel({ url, formJson, date });
    await userData.save();

    return url;
  } catch (error) {
    console.error("خطا در ذخیره داده کاربر:", error);
  }
};

const getAllClasses = async () => {
  try {
    const classes = await ClassDataModel.find();
    return classes;
  } catch (error) {
    console.error("خطا در دریافت همه کلاس‌ها:", error);
  }
};

const getAllUsers = async () => {
  try {
    const users = await UserDataModel.find();
    return users;
  } catch (error) {
    console.error("خطا در دریافت همه کاربران:", error);
  }
};

const getAllForms = async () => {
  try {
    const forms = await FormDataModel.find();
    return forms;
  } catch (error) {
    console.error("خطا در دریافت همه فرم‌ها:", error);
  }
};

const getAllResult = async () => {
	console.log("getAllResult>>>");
  try {
    const responses = await ResponseDataModel.find();
	console.log(responses)
    return responses;
  } catch (error) {
    console.error("خطا در دریافت همه پاسخ‌ها:", error);
  }
};

const getFormById = async (id) => {
	console.log("getFormById>>>");
  try {
    const form = await FormDataModel.findOne({ url: id });
	console.log(form);
    return form;
  } catch (error) {
    console.error("خطا در دریافت فرم با شناسه مشخص:", error);
  }
};

const saveResponse = async (responseJson) => {
  console.log("saveResponse");
  console.log(responseJson);
  try {
    const { id, response ,number} = responseJson;
    console.log("saveResponse");
    console.log(response);
    console.log(number);
    console.log(id);
    
    let responseData = await ResponseDataModel.findOneAndUpdate(
      { id },
      { $push: { response: response }, number: number  },
      { new: true, upsert: true }
    );
    
    console.log(responseData);
  } catch (error) {
    console.error("خطا در ذخیره پاسخ:", error);
  }
};

const getTotalResponseCount = async () => {
  try {
    const responses = await ResponseDataModel.find();
    let responseCount = {};
    responses.forEach((response) => {
      responseCount[response.id] = Object.keys(response.response).length;
    });
    return responseCount;
  } catch (error) {
    console.error("خطا در دریافت تعداد کل پاسخ‌ها:", error);
  }
};

module.exports = {
  saveFormData,
  getAllForms,
  getFormById,
  saveResponse,
  getTotalResponseCount,
  saveClassData,
  getAllClasses,
  saveUserData,
  getAllUsers,
  getAllResult,
};