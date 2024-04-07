import React, { Component, useEffect, useState } from "react";
//import logo from "./assets/logo.png";
import "./app.css";
import { postDataService } from "../manager/service";
const LoginPage = ({onLogin,setdataInput,dataInput}) => {
  // const[dataInput,setdataInput]=useState({
  //   user_email:'',
  //   user_pass:''
  // })
  const[dataStatus,setdataStatus]= useState([]);
   const handleSubmit = async e => {
      e.preventDefault();
      console.log(e.target.email.value);
      if (!dataInput.user_email) {
        alert("نام کاربری خالی است");
        return;
      }
       if (!dataInput.user_pass) {
        alert("رمز عبور شما خالی است");
        return;
      } 
    const result = await postDataService(dataInput,{
        params: {
          do: 'Access_User.login',
           user_email: "",
    user_pass: "",
        }
      })
      setdataStatus(result[0]);
      onLogin();   
      console.log(dataStatus)   

    };
      return (
        <div className="App">
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">نام کاربری</label>
              <input type="text" name="email" value={dataInput.user_email} onChange={(e)=>{setdataInput({...dataInput,user_email:e.target.value})}} placeholder="nome@email.com.br" />
            </div>
            <div className="input-group">
              <label htmlFor="password">رمز عبور</label>
              <input type="password" name="password" value={dataInput.user_pass} onChange={(e)=>{setdataInput({...dataInput,user_pass:e.target.value})}}/>
            </div>
            <button className="primary">ورود</button>
          </form>
        </div>
      );
     
    }  
 
export default LoginPage;