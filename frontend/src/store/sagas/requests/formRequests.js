import axios from "axios";

const API_BASE_URL = "http://localhost:3001/";

export const requestSaveForm = (formJson) => {
	return axios.request({
		method: "post",
		url: API_BASE_URL + "saveForm/",
		data: formJson,
	});
};
export const requestSaveClass = (formJson) => {
	return axios.request({
		method: "post",
		url: API_BASE_URL + "saveClass/",
		data: formJson,
	});
};
export const requestSaveUser = (formJson) => {
	console.log("requestSaveUser");
	return axios.request({
		method: "post",
		url: API_BASE_URL + "saveUser/",
		data: formJson,
	});
};
export const requestGetForms = () => {
	return axios.request({
		method: "get",
		url: API_BASE_URL + "getForms/",
	});
};
export const requestGetRes = () => {
	return axios.request({
		method: "get",
		url: API_BASE_URL + "getRes/",
	});
};
export const requestGetClasses = () => {
	console.log("requestGetClasses");
	return axios.request({
		method: "get",
		url: API_BASE_URL + "getClasses/",
	});
};
export const requestGetUsers = () => {
	console.log("requestGetUsers");
	return axios.request({
		method: "get",
		url: API_BASE_URL + "getUsers/",
	});
};
export const requestGetFormById = (id) => {
	return axios.request({
		method: "get",
		params: {
			id,
		},
		url: API_BASE_URL + "getFormById/",
	});
};

export const requestSaveResponse = (responseJson) => {
	return axios.request({
		method: "post",
		url: API_BASE_URL + "saveResponse/",
		data: responseJson,
	});
};

export const requestGetResponseCount = () => {
	return axios.request({
		method: "get",
		url: API_BASE_URL + "getTotalResponseCount/",
	});
};
