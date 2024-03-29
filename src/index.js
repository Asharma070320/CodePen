import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import Store from './context/store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store} >
    <Router>
    <App />
    </Router>
    </Provider>
  </React.StrictMode>,
)


export const slideUpOut = {
  initial: { opacity: 0, y:50},
  animate: { opacity: 1, y: 0},
  exit: { opacity: 0, y: 50},
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
