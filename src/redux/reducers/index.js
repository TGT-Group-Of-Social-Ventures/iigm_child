import { combineReducers } from "redux";
import { ProfileReducer } from "./Profile";
import { CourseReducer } from "./Courses";

const RootReducer = combineReducers({
  data: ProfileReducer,
  courseData: CourseReducer,
});

export default RootReducer;
