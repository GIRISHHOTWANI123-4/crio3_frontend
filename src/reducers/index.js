import {combineReducers} from "redux";
import fetchDatareducer from "./fetchDatareducer";
const allreducers=combineReducers({
    fetchDatareducer: fetchDatareducer
})


export default allreducers;
