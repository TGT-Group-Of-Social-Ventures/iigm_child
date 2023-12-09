import { combineReducers } from "redux";
import  ProfileReducer  from "./Profile";
// import { constants } from "crypto";

const RootReducer = combineReducers({
    userData : ProfileReducer   
})

export default RootReducer;