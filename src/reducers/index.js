import {combineReducers} from "redux";
import fetchDatareducer from "./fetchDatareducer";
import historyflagreducer from "./historyflagreducer";
const allreducers=combineReducers({
    fetchDatareducer: fetchDatareducer,
    historyflagreducer:historyflagreducer
})


export default allreducers;
