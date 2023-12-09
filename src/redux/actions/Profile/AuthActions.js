import {
    PROFILE
} from './ActionTypes'
import axios from 'axios';


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
            type: PROFILE,
            payload: response.data.user
        })
        // setDataLoaded(true);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}