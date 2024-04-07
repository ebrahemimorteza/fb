import { call, put } from "redux-saga/effects";
import {
	requestSaveForm,
	requestGetForms,
	requestGetFormById,
	requestSaveResponse,
	requestGetResponseCount,
	requestSaveClass,
	requestGetClasses,
	requestSaveUser,
	requestGetUsers,
	requestGetRes,
} from "../requests/formRequests";
import formActions from "../../actions/formActions";

export function* handleSaveForm(action) {
	try {
		const response = yield call(requestSaveForm, action.payload);
		yield put(formActions.saveFormSuccess(response));
	} catch (error) {
		console.error(error);
	}
}
export function* handleSaveClass(action) {
	try {
		const response = yield call(requestSaveClass, action.payload);
		yield put(formActions.saveClassSuccess(response));
	} catch (error) {
		console.error(error);
	}
}
export function* handleGetForms() {
	try {
		const response = yield call(requestGetForms);
		const responseCount = yield call(requestGetResponseCount);
		const data = {
			response: response.data,
			responseCount: responseCount.data,
		};
		yield put(formActions.getFormsSuccess(data));
	} catch (error) {
		console.error(error);
	}
}
export function* handleGetRes() {
	try {
		const response = yield call(requestGetRes);
		const responseCount = yield call(requestGetResponseCount);
		const data = {
			response: response.data,
			responseCount: responseCount.data,
		};
		yield put(formActions.getResponseSuccess(data));
	} catch (error) {
		console.error(error);
	}
}
export function* handleGetClasses() {
	console.log("handleGetClasses");
	try {
		const response = yield call(requestGetClasses);
		const responseCount = yield call(requestGetResponseCount);
		const data = {
			response: response.data,
			responseCount: responseCount.data,
		};
		yield put(formActions.getClassesSuccess(data));
	} catch (error) {
		console.error(error);
	}
}
export function* handleSaveUser(action) {
	console.log("handleSaveUser-----");
	try {
		const response = yield call(requestSaveUser, action.payload);
		console.log("handleSaveUser-----"+response);
		yield put(formActions.saveUserSuccess(response));
	} catch (error) {
		console.error(error);
	}
}
export function* handleGetUsers() {
	console.log("handleGetUsers");
	try {
		const response = yield call(requestGetUsers);
		const responseCount = yield call(requestGetResponseCount);
		const data = {
			response: response.data,
			responseCount: responseCount.data,
		};
		yield put(formActions.getUsersSuccess(data));
	} catch (error) {
		console.error(error);
	}
}


export function* handleGetFormById(action) {
	console.log("handleGetFormById");
	try {
		const response = yield call(requestGetFormById, action.payload);
		console.log(response)
		yield put(formActions.getFormSuccess(response.data));
	} catch (error) {
		console.error(error);
	}
}

export function* handleSaveResponse(action) {
	try {
		const response = yield call(requestSaveResponse, action.payload);
		yield put(formActions.saveResponseSuccess());
	} catch (error) {
		console.error(error);
	}
}
