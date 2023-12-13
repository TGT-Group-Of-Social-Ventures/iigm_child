import { SIGN_UP } from "src/redux/actions/Auth/ActionTypes";

const initialState = {
  status: false,
  error: false,
  loading: true,
};

const SignUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        status: action.payload,
        error: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default SignUpReducer
