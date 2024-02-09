import React, { useCallback, useState } from "react";
// import Navbar from './components/Navbar'
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import "./NewProjects.css";
// import Result from './components/Result';
import Result from "./Result";
import { FaChevronDown, FaCss3, FaHtml5, FaJs } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { MdCheck, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import UserProfileDetails from "./UserProfileDetails";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firbase.config";
import Alert from "./Alert";

function NewProjects() {
  //* create three usestate
  const [html_edit, setHtml_Edit] = useState("");
  const [css_edit, setCss_Edit] = useState("");
  const [js_edit, setJs_Edit] = useState("");
  const [output,setOutput] = useState("");

  //* Html onchange handler
  const onChangeHtml = useCallback((value) => {
    console.log(value);
    setHtml_Edit(value);
  }, []);

  //* Css onchange handler
  const onChangeCss = useCallback((value) => {
    console.log(value);
    setCss_Edit(value);
  }, []);

  //* JavaScript onchange handler
  const onChangeJavaScript = useCallback((value) => {
    console.log(value);
    setJs_Edit(value);
  }, []);

  //* Create Html Document
  const srcCode = `
  <html>
  <body>${html_edit}</body>
  <style>${css_edit}</style>
  <script>${js_edit}</script>
  </html>
  `;

  const [istitle, setistitle] = useState("");
  const [title, settile] = useState("Untitled");
  const [alert,setAlert] = useState(true)

  const user = useSelector((state)=> state.user.user);

  const saveBtn = async() =>{
    const id = `${Date.now()}`
    const _doc = {
      id:id,
      title:title,
      html:html_edit,
      css:css_edit,
      js: js_edit,
      output: output,
      user: user
    }
    await setDoc(doc(db, "Projects", id), _doc).then((res)=>{
      setAlert(true);
    }).catch((err)=> console.log(err))
  }
  setInterval(()=> {
    setAlert(false)
  }, 2000)
  return (
    <div className="spliters">
      {/* Navbar  */}

      <AnimatePresence>
        {alert && <Alert status={"Success"} alertMsg={"Project Saved..."} />}
      </AnimatePresence>

      <header className="newprojectHeadercontainer">
            <div className="newprojectheader">
                <div className="newprojectlogo">
                <svg viewBox="0 0 138 26" className="logoimg" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" title="CodePen" ><path d="M15 8a7 7 0 1 0 0 10m7-8.7L33 2l11 7.3v7.4L33 24l-11-7.3zm0 0 11 7.4 11-7.4m0 7.4L33 9.3l-11 7.4M33 2v7.3m0 7.4V24M52 6h5a7 7 0 0 1 0 14h-5zm28 0h-9v14h9m-9-7h6m11 1h6a4 4 0 0 0 0-8h-6v14m26-14h-9v14h9m-9-7h6m11 7V6l11 14V6" ></path></svg>
                </div>
                <div className="newprojecttitlecontainer">
                    <div className="newprojecttitle">
                       {
                        title? <>
                        <input style={{color:'white'}} type="text" placeholder="Enter Title.." value={istitle} onChange={(e)=> setistitle(e.target.value)} />
                        </> : <>
                        <p style={{color:'white'}}>{istitle}</p>
                        </>
                       }
                       {
                        title? <>
                        <div onClick={()=> settile(false)}>
                            <MdCheck style={{color: "#10B981"}}/>
                        </div>
                        </> : <>
                        <div onClick={()=> settile(true)}>
                            <MdEdit style={{color:"white"}}/>
                        </div>
                        </>
                       }
                    </div>
                    <div style={{display:"flex", justifyContent:"center", alignItems: "center", fontSize:"12px"}}>
                       <p style={{color:'white'}}>
                       {
                            user.displayName ? user.displayName : `${user.email.split('@')[0]}`
                        }
                       </p>
                       <motion.p whileTap={{scale: 0.9}} style={{fontSize: "10px",fontWeight:'500'}} className="followbtn">
                        Follow+
                       </motion.p>
                    </div>

                </div>
            </div>

            {
                user &&
               (<div className="newprojectsave">
                  <motion.button onClick={saveBtn} whileTap={{scale:0.9}}>Save</motion.button>
                  <UserProfileDetails />
               </div>
               )
            }

        </header>

      {/* main content  */}
      <div className="projects_container">
        {/* Editor  */}
        <div className="mini_projects">
          {/* Html Editor */}
          <div className="newprojectcontainer">
            <div className="headerHtml">
              <FaHtml5 className="html_icon" style={{ color: "#F75421" }} />
              <h2
                style={{ color: "white" }}
                className="text-lg font-semibold mb-2 text-white"
              >
                HTML
              </h2>
            </div>
            <CodeMirror
              className="bdii"
              value={html_edit}
              height="310px"
              theme="dark"
              extensions={[html(true)]}
              onChange={onChangeHtml}
            />
          </div>

          {/* Css Editor  */}
          <div className="newprojectcontainer">
            <div className="headerCss">
              <FaCss3 className="html_icon" style={{ color: "#006CB4" }} />
              <h2
                style={{ color: "white" }}
                className="text-lg font-semibold mb-2 text-white"
              >
                CSS
              </h2>
            </div>
            <CodeMirror
              className="bdii"
              value={css_edit}
              height="310px"
              theme="dark"
              extensions={[css(true)]}
              onChange={onChangeCss}
            />
          </div>

          {/* JavaScript Editor  */}
          <div className="newprojectcontainer">
            <div className="headerJs">
              <FaJs className="html_icon" style={{ color: "yellow" }} />
              <h2
                style={{ color: "white" }}
                className="text-lg font-semibold mb-2 text-white"
              >
                JAVASCRIPT
              </h2>
            </div>
            <CodeMirror
              className="bdii"
              value={js_edit}
              height="310px"
              theme="dark"
              extensions={[javascript(true)]}
              onChange={onChangeJavaScript}
            />
          </div>
        </div>

        <Result className="white" srcCode={srcCode} />
      </div>
    </div>
  );
}

export default NewProjects;
