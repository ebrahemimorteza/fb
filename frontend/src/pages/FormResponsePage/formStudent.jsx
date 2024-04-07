import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import formActions from "./../../store/actions/formActions";
import { history } from "./../../store/config";
import "./index.css";
import { Link } from 'react-router-dom';


const formStudent = () => {

	return (
		<main className="mt-[6rem] w-fit mx-auto m-6 flex flex-col gap-6">
    <form className="max-w-[30rem] max-sm:w-full max-sm:text-sm  p-4">
	<h4 className="p-3 bg-gradient-to-bl from-orange-500 to-orange-400 text-white rounded-xl shadow-md" style={{margin:"10px"}}>
	   ورود به ازمون ساز دانشجویان</h4>
	<Link to={"/student"} className="p-3 font-bold shadow-lg rounded-xl bg-gradient-to-br from-orange-600 to-orange-300 w-full text-white flex gap-2 items-center justify-center" style={{marginBottom:"40px"}}>ورود دانشجویان</Link>
    <Link to={"/structure"}  className="p-3 font-bold shadow-lg rounded-xl bg-gradient-to-br from-orange-600 to-orange-300 w-full text-white flex gap-2 items-center justify-center">ورود اساتید</Link>
    </form>
</main>
	);
};

export default formStudent;

const itemEnum = {
	1: "text",
	2: "checkBox",
	3: "radio",
};
