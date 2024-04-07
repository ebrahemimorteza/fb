import AddSitting from "./AddSitting";
import SittingTable from "./SittingTable";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { Link } from "react-router-dom";
import formActions from "./../../store/actions/formActions";
import axios from "axios";
// import "./FormListing.css";
const Sitting = () => {
    	const dispatch = useDispatch();
	const { data: formList, totalResponses } = useSelector((state) => state.form);

	useEffect(() => {
		dispatch(formActions.getResponse());
	}, [dispatch]);

	useEffect(() => {
		console.log("forms", formList);
		console.log("forms", formList.length);
		console.log("Response Count", totalResponses);
	});
	const downloadFile = async (filename) => {
		try {
		  const response = await axios.get(`${filename}`, { responseType: 'blob' });
	  
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
        <>
        <div id="manage_product_category" class="manage_product_category main_section ">
        <h4 class="text-center my-3">مدیریت پاسخ ها</h4>
                <div className="form-listing-container">
			{formList.length <= 0 && (
				<p className="no-form-text">There is no form, please create one by pressing below 'create form' button.</p>
			)}
			{formList.length > 0 && (
				<table className="form-list table text-center table-hover table-bordered">
					<tbody className="table-secondary">
						<tr>
							<th> پاسخ</th>
							<th> ساخته شده</th>
						</tr>
						{formList.map((form, index) => {
  const response = form.response[0]; // استفاده از اولین عنصر آرایه به عنوان عنوان
  const number = form.number;
  const date = form.date; // تعریف متغیر تاریخ
  console.log(response[1].replace("C:\\fakepath\\", "http://localhost:3001/uploads/"));
  const { url } = form;
  return (
    <tr key={index}>
      <td >{response[1].replace("C:\\fakepath\\", "http://localhost:3001/uploads/")}<a onClick={() => downloadFile(response[1].replace("C:\\fakepath\\", "http://localhost:3001/uploads/"))} >دانلود برای فایل</a></td>
      <td>{number}</td>
    </tr>
  );
})}
					</tbody>
				</table>
			)}
		</div>
    </div>
        </>
     );
}
 
export default Sitting