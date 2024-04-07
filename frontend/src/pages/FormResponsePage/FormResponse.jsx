import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { history } from "../../store/config";
import CustomInput from "../../components/CustomInput/CustomInput";
import formActions from "./../../store/actions/formActions";
import "./FormResponse.css";
import "jalaali-react-date-picker/lib/styles/index.css";
import moment from "moment-jalaali";

const FormResponse = () => {
	let { id } = useParams();

	const dispatch = useDispatch();
	const { data: form } = useSelector((state) => state.form);
	const { action } = useSelector((state) => state.form);
	const [response, setResponse] = useState({});
	const [isError, setIsError] = useState(false);
	const [questionType, setQuestionType] = useState("");
	const [token, setToken] = useState("");
	const [todayDate, setTodayDate] = useState("");
	const [isTodayGreater, setIsTodayGreater] = useState(false);

	useEffect(() => {
		dispatch(formActions.getForm(id));
		console.log(form)
	}, [id]);

	useEffect(() => {
		if (action === formActions.SAVE_RESPONSE_SUCCESS) {
			history.go(-1);
		}
	}, [action]);
	
	useEffect(() => {
		const token = localStorage.getItem('token');
		setToken(token);
		console.log(token);
		const today = moment().format("jYYYY/jMM/jDD");
		const isGreater = moment(form[0].formJson.date, "jYYYY/jMM/jDD").isAfter(moment(today, "jYYYY/jMM/jDD"));
		console.log(form[0].formJson.date);
		setIsTodayGreater(isGreater);
		console.log("forms", form[0].formJson.date);
	});
	const saveResponse = () => {
		let filteredResponse = filterResponse();
		let finalResponseObj;
		if (Object.keys(filteredResponse).length) { 
			finalResponseObj = {
				id,
				response: filteredResponse,
				number: token,
			};
			dispatch(formActions.saveResponse(finalResponseObj));
			setIsError(false);
		} else {
			setIsError(true);
		}
	};

	const filterResponse = () => {
		let filteredObj = { ...response };
		for (let key in filteredObj) {
			if (filteredObj.hasOwnProperty(key)) {
				if (
					filteredObj[key] == "" ||
					(typeof filteredObj[key] === "object" && Object.keys(filteredObj[key]).length <= 0)
				) {
					delete filteredObj[key];
				}
			}
		}
		return filteredObj;
	};

	const handleOnChange = (e, que, index = -1) => {
		let responseObj = { ...response };
		let ans;
		if (que.type === "1" || que.type === "3"  || que.type === "2") {
			ans = e.target.value;
			responseObj[que.id] = ans;
		} else if (que.type === "4") {
			ans = e.target.checked;
			if (ans) {
				responseObj[que.id] = { ...responseObj[que.id], [index]: e.target.value };
			} else {
				delete responseObj[que.id][index];
			}
		}
		setResponse(responseObj);
	};

	return (
		<>
			<div className="form-container" onFocus={() => setIsError(false)}>
				{form.length > 0 && (
					<>
						<div className="form-header">
							<span className="response-form-title">{form[0].formJson.title}</span>             
						</div>
						{form[0].formJson.body.map((que, index) => {
							
							return (
								<React.Fragment key={index}>
									<p className="question"> {`${que.id}. ${que.question}`} </p>
									<CustomInput que={que} onChange={(e, que, index) => handleOnChange(e, que, index)} />
								</React.Fragment>
							);
						})}
					</>
				)}
				{isTodayGreater ? (<div className="form-footer">
				<button className="save-response-btn btn" onClick={() => saveResponse()}>
					ذخیره
				</button>
			</div>) : ( <h4 className="p-3 bg-gradient-to-bl from-orange-500 to-orange-400 text-white rounded-xl shadow-md">
             همواره نظرات و پیشنهادات ارزنده شما ، باعث پیشرفت و خدمات رسانی بهتر ما بوده است. از این رو مشتاقانه منتظر ارسال ایده ها، پیشنهادات شما عزیزان هستیم زمان پاسخگویی به اتمام رسیده است</h4>)}

				
			</div>
			{isError && (
				<p className="error error-message">
					<span> لطفا پاسخ خود را وارد کنید!!! </span>
				</p>
			)}
		</>
	);
};

export default FormResponse;
