import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";
import {useDispatch} from "react-redux";
import { setToken } from "../../state/authSlice";
import { finallyFetchAsync } from "../../state/fetchDataSlice";
import {fetchUserInfoAsync} from "../../state/userDataSlice"
const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [msgError, setMsgError] = useState();
  const SignIn = async (e) => {
    e.preventDefault();
    const user = { email, password };
    
    try {
      const response = await fetch("http://localhost:8000/mongomind/func/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        setMsgError("This email does not exist");
        setTimeout(() => {
          setMsgError("");
        }, 3000);
      }
      else{
        const data = await response.json();
        console.log(data.token);
  
        dispatch(setToken(data.token));
        dispatch(finallyFetchAsync(data.token));
        dispatch(fetchUserInfoAsync(data.token));
        
        nav("/game");
      }
    } catch (error) {
      console.error("Error during login: " + error.message);
    }
  };

  return (
    <div>
      <div className={style.MainErrorBlock} style={{visibility: msgError ? "visible" : "hidden"}}>
        {msgError}
      </div>
      <div>
        <div className={style.MainLogin}>
          <div className={style.MainLoginSpace}>
            <div className={style.FirstFlex}>
              <p className={style.MainHeaderParag}>MongoMind</p>
              <p className={style.MainHeaderMiniParag}>Login to your account</p>
            </div>
            <div className={style.SecondFlex}>
              <form className={style.FormFlex} onSubmit={SignIn}>
                <div className={style.MiniLoginFlex}>
                  <p className={style.LoginLabel}>Email:</p>
                  <input
                    className={style.LoginInput}
                    type="text"
                    placeholder="Youraddress@gmail.com"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className={style.MiniLoginFlex}>
                  <label className={style.LoginLabel}>Password:</label>
                  <input
                    className={style.PassowdLogin}
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <button className={style.ButtonSignIn} type="submit">
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;