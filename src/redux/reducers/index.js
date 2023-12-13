import { combineReducers } from "redux";
import { ProfileReducer } from "./Profile";
import { CourseReducer } from "./Courses";
import { SignUpReducer } from "./Auth";

const RootReducer = combineReducers({
  data: ProfileReducer,
  courseData: CourseReducer,
  signUpData : SignUpReducer
});

export default RootReducer;
