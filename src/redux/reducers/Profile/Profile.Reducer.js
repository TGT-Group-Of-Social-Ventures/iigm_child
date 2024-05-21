import { PROFILE, PROFILE_UPDATE } from "../../actions/Profile/ActionTypes";

const initialState = {
  userData: {},
  error: false,
  loading: true,
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE:
      return {
        ...state,
        userData: action.payload,
        error: false,
        loading: false,
      };
    case PROFILE_UPDATE : 
      return {
        ...state,
        userData : action.paylaod,
        error : false,
        loading : false
      }
    default:
      return state;
  }
};

export default ProfileReducer;
