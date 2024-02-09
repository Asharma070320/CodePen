import React, { useEffect } from "react";
import "./App.css";
import { useState } from "react";
// import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom'
import Home from "./Component/Home";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { auth, db } from "./config/firbase.config";
import { collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { InfinitySpin } from "react-loader-spinner";
import { UseDispatch, useDispatch } from "react-redux";
import { SET_USER } from "./context/actions/userActions";
import Projects from "./Component/Projects";
import NewProjects from "./Component/NewProjects";
import { SET_PROJECT } from "./context/actions/projectActions";

const App = () => {
  const [isLoading, setisLoading] = useState(true);

  const navi = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        console.log(userCred?.providerData[0]);
        setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0]).then(
          () => {
            // dispatch using Redux
            dispatch(SET_USER(userCred?.providerData[0]));
            navi("/home/Projects", { replace: true });
          }
        );
      } else {
        navi("/home/auth", { replace: true });
      }
      setInterval(() => {
        setisLoading(false);
      }, 2000);
    });
    return () => unsubscribe();
  }, []);

  const [count, setCount] = useState(0);

  useEffect(()=>{
    const projectQuery = query(
      collection(db, "Projects"),
      orderBy("id", "desc")
      );

      const unsubscribe = onSnapshot(projectQuery, (querySnaps) =>{
        const projectList = querySnaps.docs.map((doc) => doc.data());
        dispatch(SET_PROJECT(projectList));
      });

      return unsubscribe;
    
  },[])

  return (
    <>
      {isLoading ? (
        <div className="forHome_loading">
          <InfinitySpin
            visible={true}
            width="200"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
          />
        </div>
      ) : (
        <div>
          <Routes>
            <Route path="/home/*" element={<Home />} />
            <Route path="/newProjects" element={<NewProjects />} />
            <Route path="/*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
