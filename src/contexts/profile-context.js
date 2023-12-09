import { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'

const HANDLERS = {
    INITIALIZE: 'INITIALIZE',
    PROFILE: 'PROFILE'
}

const initialState = {
    isLoading: true,
    user: null
};

const handlers = {

    [HANDLERS.PROFILE]: (state, action) => {
        const profileData = action.payload;
        return {
            ...state,
            profileData,
            isLoading: false
        }
    }
}

const reducer = (state, action) => (
    handlers[action.type] ? handlers[action.type](state, action) : state
);

export const ProfileContext = createContext({ undefined });

export const ProfileProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);
    const initialized = useRef(false);

    // const [userData, setUserData] = useState({});

    const getAllUserDetails = async () => {
        const token = await localStorage.getItem("token").slice(1, -1);
        const email = await localStorage.getItem("userMail").slice(1, -1);
        await getUserData(token, email);
    }

    const getUserData = async (token, email) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
            const response = await axios.post('https://backend.iigminstitute.com/api/auth/profile', {
                userMail: email,
            });
            // console.log('User data:', response);
            // setUserData(response.data.user);
            dispatch({
                type: HANDLERS.PROFILE,
                payload: response.data.user
            })
            // setDataLoaded(true);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await getAllUserDetails();
            console.log('kishan', profile);
        };
        fetchData();
    }, [])

    return (
        <ProfileContext.Provider value={{
            ...state,
            getAllUserDetails
        }}>
            {children}
        </ProfileContext.Provider>
    )
}
ProfileProvider.propTypes = {
    children: PropTypes.node
};

export const ProfileConsumer = ProfileContext.Consumer;
export const useProfileContext = () => useContext(ProfileContext);

