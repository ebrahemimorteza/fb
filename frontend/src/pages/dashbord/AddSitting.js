import React, { useContext, useEffect, useRef, useState } from "react";
import ModalContainer from "../../component/ModalContaainer";
import { postDataService, postDataUpload } from "../../manager/service";
import axios from "axios";
import swal from "sweetalert";
import DataContent from "../../context/dataContent";
import Modal from "../../components/Modal/Modal";
// import "./CreateForm.css";
import { useDispatch, useSelector } from "react-redux";
import formActions from "./../../store/actions/formActions";
import { history } from "./../../store/config";
import { Link } from "react-router-dom";

const AddSitting = () => {
  const [dataEdit, setDataEdit] = useState([]);
  const context = useContext(DataContent);
  const [formBody, setFormBody] = useState([]);
	const [formTitle, setFormTitle] = useState("New Form");
	const [question, setQuestion] = useState("");
	const [options, setOptions] = useState([]);
	const [questionType, setQuestionType] = useState(0);
	const [addQuestionModalVisible, setAddQuestionModalVisible] = useState(false);
	const inputLowerModalRef = useRef(null);

	const handleBackgroundClick = () => {
	  
	};

	const dispatch = useDispatch();
	const { action } = useSelector((state) => state.form);

	const addQuestion = () => {
		setAddQuestionModalVisible(true);
	};

	const addNewQuestion = () => {
		setAddQuestionModalVisible(false);
		let formBodyArr = [...formBody];
		let questionObj = {
			id: formBodyArr.length + 1,
			type: questionType,
			question: question,
			options: options,
		};
		formBodyArr.push(questionObj);
		setFormBody(formBodyArr);
		resetQuestionModal();
	};

	const onQuestionTypeChange = (e) => {
		setQuestionType(e.target.value);
	};

	const questionInputChange = (e) => {
		inputLowerModalRef.current.focus();
		setQuestion(e.target.value);
	};

	const optionInputChange = (e) => {
		let rawOptions = e.target.value;
		let optionsArr = [...rawOptions.trim().split("\n")];
		optionsArr = optionsArr.filter((item) => !!item);
		setOptions(optionsArr);
	};
	useEffect(() => {
		if (action === formActions.SAVE_USER_SUCCESS) {
			history.go(-1);
		}
	
	}, [action]);
	const saveForm = () => {
		const formJson = {
			title: formTitle,
			body: formBody,
		};
		dispatch(formActions.saveUser(formJson));
	};

	const resetQuestionModal = () => {
		setOptions([]);
		setQuestionType(0);
		setQuestion("");
	};

	const cancelNewQuestion = () => {
		resetQuestionModal();
		setAddQuestionModalVisible(false);
	};


  return (
    <>
	  <div className="button-container btn btn-success d-flex justify-content-center align-items-center">
	  <Link to="/create-User">
		  <button id="create-form-btn">ایجاد کاربر</button>
	  </Link>
  </div>
      <ModalContainer
        id={"add_product_category_modal"}
        fullScreen={true}
        title={context.changeStatus ? "افزودن فرم":"ویرایش فرم"}
      >
      <div className="form-container">
			<div className="form-header lower-modal">
				<input
					type="text"
					placeholder="نام و نام خانوادگی"
					className="form-title"
					value={formTitle}
					onChange={(e) => setFormTitle(e.target.value)}
				/>
			</div>
			<div className="form-header lower-modal">
				<input
					type="text"
					placeholder="شماره همراه"
					className="form-title"
					value={formTitle}
					onChange={(e) => setFormTitle(e.target.value)}
				/>
			</div>
			<div className="form-body">
			</div>
			<div className="form-footer">
				<button className="save-form-btn btn"  onClick={() => saveForm()}>
					ذخیره
				</button>
			</div>
		</div>
      </ModalContainer>
    </>
  );
};

export default AddSitting;

const itemEnum = {
	1: "text",
	2: "checkBox",
	3: "radio",
};

