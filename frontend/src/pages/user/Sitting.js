import AddSitting from "./AddSitting";
import SittingTable from "./SittingTable";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { Link } from "react-router-dom";
import formActions from "./../../store/actions/formActions";
// import "./FormListing.css";
const Sitting = () => {
    	const dispatch = useDispatch();
	const { data: formList, totalResponses } = useSelector((state) => state.form);

	useEffect(() => {
		dispatch(formActions.getUsers());
	}, [dispatch]);

	useEffect(() => {
		console.log("forms", formList);
		console.log("Response Count", totalResponses);
	});
    return ( 
        <>
        <div id="manage_product_category" class="manage_product_category main_section ">
        <h4 class="text-center my-3">مدیریت کاربر ها</h4>
        
        <SittingTable/>
        <div className="form-listing-container">
			{formList.length <= 0 && (
				<p className="no-form-text">There is no form, please create one by pressing below 'create form' button.</p>
			)}
			{formList.length > 0 && (
				<table className="form-list table text-center table-hover table-bordered">
					<tbody className="table-secondary">
						<tr>
							<th>نام و نام خانوادگی</th>
							<th> شماره همراه</th>
							<th> ساخته شده</th>
						</tr>
						{formList.map((form, index) => {
							const title = form.formJson.title;
							const number = form.formJson.number;
							const { url, date } = form;
							return (
								<tr key={index}>
									<td>{title}</td>
									<td>{number}</td>
									<td>{date}</td>
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