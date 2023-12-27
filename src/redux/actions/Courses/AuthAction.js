import { COURSES } from "./ActionTypes";
import axios from "axios";

export const getCourseContent = (email,token=0) => {
  return async (dispatch) => {
    try {
      // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.post('https://backend.iigminstitute.com/api/courses/yourCourses',{
        userMail:email,
      }); 
      dispatch({
        type: COURSES,
        payload: response.data.courses,
      });
    } catch (error) {
      console.error("Error fething course data", error);
    }
  };
};
