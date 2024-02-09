import React from "react";
import "./SignUp.css";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { FaEnvelope, FaEye, FaEyeSlash, FaGithub } from "react-icons/fa6";
import {FcGoogle} from 'react-icons/fc'
import { MdPassword } from "react-icons/md";
// import {motion} from
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider,signInWithRedirect,GithubAuthProvider } from "firebase/auth";
import { auth } from "../config/firbase.config";

const Login = () => {
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLogin ,setisLogin] = useState(false);

  const handelTxtChange = (e) => {
    setValue(e.target.value);
    setEmail(e.target.value);
    // setPassword(e.target.value)
  };

  const notify = (text) => {
    toast.success(text, {
      position: "top-center"
    });
}

const errorNotification =(text) =>{
    toast.error(text, {
        position: "top-center"
      });
}

  const getPass = (e) => {
    setPassword(e.target.value);
  };
  console.log(email, password);

  const navi = useNavigate();

  const googleLoginIn = async(e) => {
    e.preventDefault();
    try{
        let response=await signInWithEmailAndPassword(auth,email,password)
        notify('Login Successfully')
    }
    catch(err){
        console.error(err);
        errorNotification('Please Check Your Email & Password')
    }
    
  }

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const signInGoogle = async() => {
    try{
        let res = await signInWithRedirect(auth,googleProvider);
        window.location.reload();
    }catch(err){
        console.error(err);
    }
  }

  const signInGithub = async() => {
    try{
        let res = await signInWithRedirect(auth,githubProvider);
        window.location.reload();
    }catch(err){
        console.error(err);
    }
  }
 

  return (
    <div className="signUp_Container">
      <svg
        className="small"
        viewBox="0 0 138 26"
        fill="none"
        stroke="#fff"
        stroke-width="2.3"
        stroke-linecap="round"
        stroke-linejoin="round"
        title="CodePen"
      >
        <path d="M15 8a7 7 0 1 0 0 10m7-8.7L33 2l11 7.3v7.4L33 24l-11-7.3zm0 0 11 7.4 11-7.4m0 7.4L33 9.3l-11 7.4M33 2v7.3m0 7.4V24M52 6h5a7 7 0 0 1 0 14h-5zm28 0h-9v14h9m-9-7h6m11 1h6a4 4 0 0 0 0-8h-6v14m26-14h-9v14h9m-9-7h6m11 7V6l11 14V6"></path>
      </svg>
      <ToastContainer />
      <div className="mini_signup">
        <p>Join With Us! 🤩</p>

        <div className="in_mini">
          {/* <UserAuthinput /> */}
          <div className="userAuth_Container">
            <label htmlFor="" className="UserAuth_label">
              Email
            </label>

            <div className="User_Email_Inp">
              <FaEnvelope className="msg_env" />
              <input
                type="text"
                className="UserAuth_inps"
                placeholder="Email here"
                value={value}
                onChange={handelTxtChange}
              />
              {/* <div className="eye_icon">
                <FaEye className="sign_eye" />
              </div> */}
            </div>

            <label
              htmlFor=""
              className="UserAuth_label"
              style={{ marginTop: "5px" }}
            >
              Password
            </label>
            <div className="user_password_inps">
              <MdPassword className="msg_env" />
              {/* <MdPassword /> */}
              <input
                type={showPass ? "text" : "password"}
                className="UserAuth_inps"
                placeholder="Password"
                value={password}
                onChange={getPass}
              />
              <motion.div
                onClick={() => setShowPass(!showPass)}
                whileTap={{ scale: 0.9 }}
                className="eye_icon"
              >
                {/* <FaEye className="sign_eye" /> */}
                {showPass ? (
                  <FaEye className="sign_eye" />
                ) : (
                  <FaEyeSlash className="sign_eye" />
                )}
              </motion.div>
            </div>
            <motion.div onClick={googleLoginIn} className="btnSignUp" whileTap={{scale: 0.9}}>
            <p>Login</p>
           </motion.div>

           <p className="have_account">Already Have an account ?<span onClick={()=> navi('/Home/auth')} className="loginBtn"> Sign Up</span></p>

                <div>
                    <p className="or_center">-------------  OR  -------------</p>
                </div>

                <motion.div onClick={signInGoogle} className="google_container" whileTap={{scale : .9}}>
                    <FcGoogle className="google_icon"/>
                    <p className="googleIcon_Txt">Sign in with Google</p>
                    </motion.div>

                <div>
                    <p className="or_center">-------------  OR  -------------</p>
                </div>

                <motion.div onClick={signInGithub} className="google_container" whileTap={{scale : .9}}>
                    <FaGithub className="github_icon"/>
                    <p style={{color:'white'}} className="googleIcon_Txt">Sign in with Github</p>
                    </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
