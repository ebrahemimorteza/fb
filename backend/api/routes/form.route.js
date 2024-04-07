const express = require("express");
const formController = require("../controller/form.controller");

const router = express.Router();

router.route("/saveForm").post(formController.saveForm);
router.route("/saveClass").post(formController.saveClass);
router.route("/getClasses").get(formController.getClasses);
router.route("/getForms").get(formController.getForms);
router.route("/getRes").get(formController.getResult);
router.route("/saveUser").post(formController.saveUser);
router.route("/getUsers").get(formController.getUsers);
router.route("/getFormById/").get(formController.getFormById);
router.route("/saveResponse/").post(formController.saveResponse);
router.route("/getTotalResponseCount/").get(formController.getTotalResponseCount);

module.exports = router;
