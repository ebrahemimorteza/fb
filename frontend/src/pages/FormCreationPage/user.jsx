import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import "./CreateForm.css";
import { useDispatch, useSelector } from "react-redux";
import formActions from "./../../store/actions/formActions";
import { history } from "./../../store/config";

const CreateForm = () => {
	const [formTitle, setFormTitle] = useState("");
	const [formNumber, setFormNumber] = useState("");
	const [questionType, setQuestionType] = useState("");
	const dispatch = useDispatch();
	const { data: formList} = useSelector((state) => state.form);
	useEffect(() => {
		dispatch(formActions.getClasses());
	}, [dispatch]);
	const { action } = useSelector((state) => state.form);

	const onQuestionTypeChange = (e) => {
		alert(e.target.value);
		setQuestionType(e.target.value);
	};

	const saveUser = () => {
		const formJson = {
			title: formTitle,
			number: formNumber,
			idClass:questionType
		};
		dispatch(formActions.saveUser(formJson));
	};

	useEffect(() => {
		if (action === formActions.SAVE_USER_SUCCESS) {
			alert(14)
			history.go(-1);
		}
	}, [action]);

	return (
		<div className="container form-container" style={{display:"contents"}}>
			<div className="form-header">
				<input
					type="text"
					placeholder="نام و نام خانوادگی"
					className="form-title"
					value={formTitle}
					onChange={(e) => setFormTitle(e.target.value)}
				/>
			</div>
			<div className="form-body">

			<input
					type="text"
					placeholder="شماره همراه"
					className="form-title"
					value={formNumber}
					onChange={(e) => setFormNumber(e.target.value)}
				/>
				<div className="select-question-type-container">
				انتخاب گروه کلاس:
				{formList.length > 0 && (
				<select className="select-question-type" onChange={(e) => onQuestionTypeChange(e)}>			
					{formList.map((form, index) => {
						const title = form.formJson.title;
						const { url, date } = form;
						return (
							<option key={index} value={url}>{title}</option>
						);
					})};
					</select>
					)}
			</div>
			</div>
			<div className="form-footer">
				<button className="save-form-btn btn" onClick={() => saveUser()}>
					ثبت کاربر
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
