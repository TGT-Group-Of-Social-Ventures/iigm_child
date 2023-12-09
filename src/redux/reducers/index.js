import { combineReducers } from "redux";
import  {ProfileReducer}  from "./Profile";

const RootReducer = combineReducers({
    data : ProfileReducer   
})

export default RootReducer;