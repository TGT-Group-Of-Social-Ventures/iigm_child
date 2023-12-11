import { PROFILE } from "./ActionTypes";
import axios from "axios";

export const getAllUserDetails = () => {
  return async (dispatch) => {
    try {
      const token = await localStorage.getItem("token").slice(1, -1);
      const email = await localStorage.getItem("userMail").slice(1, -1);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.post("https://backend.iigminstitute.com/api/auth/profile", {
        userMail: email,
      });

      dispatch({
        type: PROFILE,
        payload: response.data.user,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Optionally dispatch an error action or handle the error as needed
    }
  };
};
