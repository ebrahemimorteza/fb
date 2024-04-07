import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import formActions from "./../../store/actions/formActions";
import { history } from "./../../store/config";
import "./index.css";
import { Link } from "react-router-dom";

const CreateForm = () => {
	const [isOpen, setisOpen] = useState(false);
	const [formTitle, setFormTitle] = useState("");
	const [formNumber, setFormNumber] = useState("");
	const [questionType, setQuestionType] = useState("");
	const [iclass, setIclass] = useState("");
	const dispatch = useDispatch();
	const dispatch1 = useDispatch();
	const { data: formList} = useSelector((state) => state.form);
	useEffect(() => {
		dispatch(formActions.getUsers());
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
		};
		dispatch(formActions.saveUser(formJson));
	};

	useEffect(() => {
		if (action === formActions.SAVE_USER_SUCCESS) {
			// history.go(-1);
		}
	}, [action]);

	const handleInputChange = (event) => {
		const value = event.target.value;
		setFormNumber(value);
	  };
	  const handleSingin = ()=>{
		if (formNumber.length === 11) {
			const hasDuplicate = formList.map((form) => {
			  // این قسمت را براساس ساختار داده‌های خود تغییر دهید
			  return form.formJson.number === formNumber;
			});
			const duplicateIndex = hasDuplicate.findIndex((duplicate) => duplicate);
			if (duplicateIndex !== -1) {
			  const duplicateForm = formList[duplicateIndex];
			  history.push('/admin');
			  alert('با موفقیت وارد شدید');
			} else {
			  alert('دوباره سعی کنید');
			}
		  }
	  }
	return (
		<main className="mt-[6rem] w-fit mx-auto m-6 flex flex-col gap-6">
    <form className="max-w-[30rem] max-sm:w-full max-sm:text-sm  p-4">
        <h4 className="p-3 bg-gradient-to-bl from-orange-500 to-orange-400 text-white rounded-xl shadow-md">
            ورود استاد</h4>
        <div className="w-full my-4">
            <label for="name">
                نام : </label>
            <input 	value={formTitle}
			onChange={(e) => setFormTitle(e.target.value)} name="name" className="rounded-xl bg-zinc-100 w-full mt-2 p-3 input-style  undefined" type="text" id="name" />
        </div>
        <div className="w-full my-4">
            <label for="number">
                شماره تماس  : </label>
            <input name="phonenumber" value={formNumber}
			onChange={handleInputChange} className="rounded-xl bg-zinc-100 w-full mt-2 p-3 input-style  undefined" type="number" id="number"/>
        </div>
		<button onClick={handleSingin}  className="p-3 font-bold shadow-lg rounded-xl bg-gradient-to-br from-orange-600 to-orange-300 w-full text-white flex gap-2 items-center justify-center">ورود<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></button>

    </form>
</main>
	);
};

export default CreateForm;

const itemEnum = {
	1: "text",
	2: "checkBox",
	3: "radio",
};
