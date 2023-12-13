import { SIGN_UP } from "./ActionTypes";
import axios from "axios";

export const signUp = (data,headers) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "https://backend.iigminstitute.com/api/auth/register",
        data,
        headers
      );
      // console.log('res',response.data);
      if (response.data.status) {
        // console.log("Registration successful!", response.data);
        await localStorage.setItem("verifyEmail", data.email);
        dispatch({
            type : SIGN_UP,
            payload : response.data.status
        });
      } else {
        const msg = response.data.msg;
        alert(msg);
      }
    } catch (error) {
      console.log("Error signinup", error);
    }
  };
};
