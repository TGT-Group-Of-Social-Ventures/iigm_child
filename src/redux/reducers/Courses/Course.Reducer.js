import { COURSE } from "../../actions/Courses/ActionTypes";

const initialState = {
  courseData: {},
  error: false,
  loading: false,
};

const CourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case COURSE:
      return {
        ...state,
        courseData: action.payload,
        error: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default CourseReducer;
