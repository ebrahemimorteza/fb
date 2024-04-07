import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import "./CreateForm.css";
import { useDispatch, useSelector } from "react-redux";
import formActions from "./../../store/actions/formActions";
import { history } from "./../../store/config";

const CreateForm = () => {
	const [formBody, setFormBody] = useState([]);
	const [formTitle, setFormTitle] = useState("");
	const [question, setQuestion] = useState(""); 
	const [options, setOptions] = useState([]);
	const [questionType, setQuestionType] = useState(0);
	const [addQuestionModalVisible, setAddQuestionModalVisible] = useState(false);

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
		setQuestion(e.target.value);
	};

	const optionInputChange = (e) => {
		let rawOptions = e.target.value;
		let optionsArr = [...rawOptions.trim().split("\n")];
		optionsArr = optionsArr.filter((item) => !!item);
		setOptions(optionsArr);
	};

	const saveClass = () => {
		const formJson = {
			title: formTitle,
			body: formBody,
		};
		dispatch(formActions.saveClass(formJson));
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

	useEffect(() => {
		if (action === formActions.SAVE_CLASS_SUCCESS) {
			history.go(-1);
		}
	}, [action]);

	return (
		<div className="container form-container" style={{display:"contents"}}>
			<div className="form-header">
				<input
					type="text"
					placeholder="عنوان کلاس"
					className="form-title"
					value={formTitle}
					onChange={(e) => setFormTitle(e.target.value)}
				/>
			</div>
			<div className="form-body">
			</div>
			<div className="form-footer">
			
				<button className="save-form-btn btn" onClick={() => saveClass()}>
					ذخیره
				</button>
			</div>
		</div>
	);
};

export default CreateForm;

const itemEnum = {
	1: "text",
	2: "checkBox",
	3: "radio",
};
