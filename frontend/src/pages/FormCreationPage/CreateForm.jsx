import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import "./CreateForm.css";
import { useDispatch, useSelector } from "react-redux";
import formActions from "./../../store/actions/formActions";
import { history } from "./../../store/config"; 
import { DatePicker } from "jalaali-react-date-picker";
import "jalaali-react-date-picker/lib/styles/index.css";
import moment from "moment-jalaali";
import axios from "axios";

const CreateForm = () => {
	const [formBody, setFormBody] = useState([]);
	const [formTitle, setFormTitle] = useState("تمرین سیستم عامل");
	const [question, setQuestion] = useState("");
	const [options, setOptions] = useState([]);
	const [questionType, setQuestionType] = useState(0);
	const [questionType2, setQuestionType2] = useState("");
	const [addQuestionModalVisible, setAddQuestionModalVisible] = useState(false);
	const { data: formList} = useSelector((state) => state.form);
	const dispatch = useDispatch();
	const [fileUploader, setFileUploader] = useState(null);
	const [fileNameUploader, setFileNameUploader] = useState(null);

	const [selectedDate, setSelectedDate] = useState(null);

	const handleDateChange = (date) => {
		const jalaaliDate = moment(date).format("jYYYY/jMM/jDD");
		// const today = moment().format("jYYYY/jMM/jDD");
	  setSelectedDate(jalaaliDate);
	};
  

	useEffect(() => {
		dispatch(formActions.getClasses());
	}, [dispatch]);

	const { action } = useSelector((state) => state.form);

	const addQuestion = () => {
		setAddQuestionModalVisible(true);
	};
	const handleFileUpload = (e) => {
    setFileUploader(e.target.files[0]);
};
const handleSubmit = (event) => {
    event.preventDefault();

    if (fileUploader) {
      const formData = new FormData();
      formData.append('file', fileUploader);

      axios.post('http://localhost:3001/upload', formData)
  .then((response) => {
	setFileNameUploader(response.data.fileName)
    console.log('نتیجه:', response.data.fileName
	);
  })
  .catch((error) => {
    console.error('خطا:', error);
  });
    } else {
      console.log('فایلی انتخاب نشده است.');
    }
  };

	const addNewQuestion = () => {
		setAddQuestionModalVisible(false);
		let formBodyArr = [...formBody];
		let questionObj = {
			id: formBodyArr.length + 1,
			type: questionType,
			question: question,
			options: options,
			file:fileUploader,
			fileName: fileNameUploader,
			
			
		};
		formBodyArr.push(questionObj);
		setFormBody(formBodyArr);
		resetQuestionModal();
	};

	const onQuestionTypeChange = (e) => {
		setQuestionType(e.target.value);
	};
	const onQuestionTypeChange2 = (e) => {
		setQuestionType2(e.target.value);
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

	const saveForm = () => {
		const formJson = {
			title: formTitle,
			body: formBody,
			date: selectedDate,
			idClass:questionType2,
			file: fileUploader,
			
		};
		dispatch(formActions.saveForm(formJson));
	};

	const resetQuestionModal = () => {
		setOptions([]);
		setQuestionType(0);
		setQuestion("");
		setFileUploader(null);
		setFileNameUploader(null);
	};

	const cancelNewQuestion = () => {
		resetQuestionModal();
		setAddQuestionModalVisible(false);
	};

	useEffect(() => {
		if (action === formActions.SAVE_FORM_SUCCESS) {
			history.go(-1);
		}
	}, [action]);
	const downloadFile = async (filename) => {
		try {
		  const response = await axios.get(`http://localhost:3001/uploads/${filename}`, { responseType: 'blob' });
	  
		  const url = window.URL.createObjectURL(new Blob([response.data]));
		  const link = document.createElement('a');
		  link.href = url;
		  link.setAttribute('download', filename);
		  document.body.appendChild(link);
		  link.click();
		  link.remove();
		  window.URL.revokeObjectURL(url);
		} catch (error) {
		  console.log('Error downloading file:', error);
		}
	  };

	return (
		<div className="container form-container" style={{display:"contents"}}>
			<div className="form-header">
				<input
					type="text"
					placeholder="عنوان فرم"
					className="form-title"
					value={formTitle}
					onChange={(e) => setFormTitle(e.target.value)}
				/>
				<div className="select-question-type-container" style={{marginTop:"10px",marginBottom:"10px"}}>
				
				{formList.length > 0 && (
				<select className="form-title" onChange={(e) => onQuestionTypeChange2(e)}>			
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
			<DatePicker 

			  selected={selectedDate}
			  onChange={handleDateChange}
			  placeholder="تاریخ"
			/>
			</div>
			<div className="form-body">
				{formBody.map((que, index) => {
					return (
						<React.Fragment key={index}>
							<p className="question"> {`${que.id}. ${que.question}`} </p>
							{que.type == "1" && (
								<div key={que.id}>
									<textarea
										className={"question-text-input question-text-input-" + que.id}
										cols="60"
										rows="4"
										placeholder="لطفا پاسخ خود را وارد کندی"
										value={""}
										readOnly={true}
									/>
								</div>
							)}
							{que.type == "2" && (
								<div className="file-uploader" key={que.id}>
		
                                 <a onClick={() => downloadFile(que.fileName)} >دانلود {que.fileName}</a>
                               </div>
							)}
							{que.type == "3" && (
								<div key={que.id}>
									{que.options.map((opn, index) => {
										return (
											<div className={`option checkBox`} key={index}>
												<input
													type="checkbox"
													value={opn}
													key={index}
													checked={false}
													readOnly={true}
													className={`optionInput answer-checkbox-${que.id}-${index}`}
												/>
												{opn}
											</div>
										);
									})}
								</div>
							)}

							{que.type == "4" && (
								<div key={que.id}>
									{que.options.map((opn, index) => {
										return (
											<div className={`option radio `} key={index}>
												<input
													type="radio"
													value={opn}
													key={index}
													checked={false}
													readOnly={true}
													name={`answer-radio-${que.id}`}
													className={`optionInput answer-radio-${que.id}-${index}`}
												/>
												{opn}
											</div>
										);
									})}
								</div>
							)}
				
						</React.Fragment>
					);
				})}
			</div>
			<div className="form-footer">
				<button className="add-question-btn btn" onClick={() => addQuestion()}>
					اضافه کردن سوال
				</button>
				<button className="save-form-btn btn" onClick={() => saveForm()}>
					ذخیره
				</button>
			</div>

			<Modal isOpen={addQuestionModalVisible}>
				<div className="new-question-container">
					<div className="new-question-header">
						ورود سوال:
						<input
							type="text"
							placeholder="سوال جدید"
							className="new-question-input"
							value={question}
							onChange={(e) => questionInputChange(e)}
						/>
					</div>
					<div className="new-question-body">
						<div className="select-question-type-container">
							نوع سوال را انتخاب کنید:
							<select className="select-question-type" onChange={(e) => onQuestionTypeChange(e)} defaultValue={0}>
								<option value="0" hidden>
									--انتخاب--
								</option>
								<option value="1"> متن </option>
								<option value="2"> فایل </option>
								<option value="3"> چک باکس </option>
								<option value="4"> رادیو باتن </option>
							</select>
						</div>
						<div className="answer-container">
						{questionType == 2 && (    
							<>
							<div className="file-uploader">
							<form onSubmit={handleSubmit}>
							<input
							 type="file"
							 accept=".pdf,.doc,.docx"
							 onChange={(e) => handleFileUpload(e)}
							 />
							 <button className="cancel-new-question-btn btn" type="submit">آپلود</button>
							 </form>
						 </div>
							</>
						)}
							{questionType > 2 && (
								<>
									Enter Options (line seperated):
									<textarea
										className="options-input"
										cols="60"
										rows="4"
										placeholder="اضافه کردن اپشن ها"
										onChange={(e) => optionInputChange(e)}
									/>
								</>
							)}
						</div>
					</div>
					<div className="add-new-question-btn-container">
						<button
							className="add-new-question-btn btn"
							onClick={() => addNewQuestion()}
							disabled={questionType <= 0 || question == "" || (questionType > 2 && options.length <= 0)}
						>
							ذخیره
						</button>
						<button className="cancel-new-question-btn btn" onClick={() => cancelNewQuestion()}>
							خروج
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default CreateForm;

const itemEnum = {
	1: "متن",
	2: "فایل",
	3: "چکباکس",
	4: "رادیو باتن",
};
