import {combineReducers} from 'redux';
import userAuthReducer from './userAuthReducer';
import projectReducer from './ProjectReducer';


const myReducer = combineReducers({
    user : userAuthReducer,
   project : projectReducer
})

export default myReducer;