import { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userMail, setUserMail] = useState("");
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      const check = await localStorage.getItem("userMail");
      if (check) isAuthenticated = true;
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = {
        id: "5e86809283e28b96d2d38537",
        avatar: "/assets/avatars/avatar-anika-visser.png",
        name: "Anika Visser",
        email: "test@gmail.com",
      };
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem("authenticated", "true");
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: "5e86809283e28b96d2d38537",
      avatar: "/assets/avatars/avatar-anika-visser.png",
      name: "Anika Visser",
      email: "anika.visser@devias.io",
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user,
    });
  };

  const signIn = async (email, password,role) => {

    try {
      const studentLoginURL = "https://backend.iigminstitute.com/api/auth/login";
      const otherURL = "";
      const baseURL = role === 'student' ? studentLoginURL : otherURL;
      const response = await axios.post(baseURL, {
        email,
        password,
      });
      if (response.data.status) {
        await localStorage.setItem("userMail", JSON.stringify(email));
        await localStorage.setItem("token", JSON.stringify(response.data.token));
        await window.sessionStorage.setItem("authenticated", "true");
        const fetchedUserName = response.data.userReturn.name;
        await localStorage.setItem('userName',fetchedUserName);
        const user = {
          id: "5e86809283e28b96d2d38537",
          avatar: "/assets/avatars/avatar-anika-visser.png",
          name: "Anika Visser",
          email: "anika.visser@devias.io",
        };
        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: user,
        });
      } else {
        const msg = response.data.msg;
        alert(msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const signUp = async (email, name, password) => {
    throw new Error("Sign up is not implemented");
  };

  const signOut = async () => {
    try {
      await localStorage.removeItem("userMail");
      await localStorage.removeItem("token");
      await window.sessionStorage.removeItem("authenticated");
      dispatch({
        type: HANDLERS.SIGN_OUT,
      });
    } catch (error) {
      console.log("error logging out", error.msg);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
