import React, { useState, useRef } from "react";
import "./Home.css";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi2";
import { FaSearchengin } from "react-icons/fa6";
import { Link, Route,Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Projects from "./Projects";
import Login from "./Login";
import { useSelector } from "react-redux";
import UserProfileDetails from './UserProfileDetails'

  
// import { useState } from "react";

const Home = () => {
  const [as, setAs] = useState(true);

  const user = useSelector((state)=> state.user?.user)
  const visbility = useRef();

  const close = () => {
    setAs(!as);
    visbility.current.className = "hide";
  };
  // console.log(vis);

  // let[ user, setUser] = useState(null);

  return (
    <div className="home_Container">
      {/* Left Side of Home */}
      <div id="pad" className={as ? "home_Left" : "close"}>
        <Link to="/" ref={visbility}>
          <svg
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
        </Link>

        <div className="togBtn" onClick={close}>
          <HiChevronDoubleLeft className="doubleLeft" />

          {/* <HiChevronDoubleRight /> */}
        </div>

        {
          user? <Link className="home_Link" to="/newProjects">
          <div className="home_startDiv">
            <p>Start Coding</p>
          </div>
        </Link> : <Link className="home_Link" to="/home/auth">
          <div className="home_startDiv">
            <p>Start Coding</p>
          </div>
        </Link>
        }

      </div>

      {/* Right Side of Home */}
      <div className="home_Right">
        <div className="homeRight_top">
          <div className="homeinp_andIcon">
            <FaSearchengin className="search_inIcon" />
            <input
              type="text"
              className="home_search"
              placeholder="Search here..."
            />
            
          </div>
          {
                !user && (
                    <div className="homesigninbtn">
                        <Link to={"/home/auth"}>
            <button className="signUp_btn">SignUp</button>
            </Link>
                    </div>
                )
            }
            {user && <UserProfileDetails />}
        </div>

        <div className="bottom_right">
      <Routes>
           <Route path="/*" element={<Projects />} />
            <Route path="/auth" element={<SignUp />} />
            <Route path="/Login" element={<Login />} />
        </Routes>
      </div>          

      </div>

      
    </div>
  );
};

export default Home;
