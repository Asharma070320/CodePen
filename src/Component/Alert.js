import React from "react";
import "./Alert.css";
import { motion } from "framer-motion";

const Alert = ({ status, alertMsg }) => {
  return (
    <motion.div className="fixed_msg">
      {status === "Success" && (
        <div className="alert_Container">
          <p className="success_alert_msg">{alertMsg}</p>
        </div>
      )}

      {status === "Warning" && (
        <div className="warn_alert_Container">
          <p className="alert_msg">{alertMsg}</p>
        </div>
      )}

      {status === "Danger" && (
        <div className="dan_alert_Container">
          <p className="alert_msg">{alertMsg}</p>
        </div>
      )}
    </motion.div>
  );
};

export default Alert;
