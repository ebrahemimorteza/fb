import { takeLatest } from "redux-saga/effects";
import { handleGetForms, handleSaveForm, handleGetFormById, handleSaveResponse,handleSaveClass,handleGetClasses,handleGetUsers,handleSaveUser,handleGetRes } from "./handler/formHandler";
import formActions from "../actions/formActions";

export function* watcherSaga() {
	yield takeLatest(formActions.SAVE_FORM, handleSaveForm);
	yield takeLatest(formActions.SAVE_CLASS, handleSaveClass);
	yield takeLatest(formActions.SAVE_USER, handleSaveUser);
	yield takeLatest(formActions.GET_ALL_FORMS, handleGetForms);
	yield takeLatest(formActions.GET_ALL_USERS, handleGetUsers);
	yield takeLatest(formActions.GET_ALL_CLASSES, handleGetClasses);
	yield takeLatest(formActions.GET_FORM_BY_ID, handleGetFormById);
	yield takeLatest(formActions.SAVE_RESPONSE, handleSaveResponse);
	yield takeLatest(formActions.GET_ALL_RES, handleGetRes);
}
