import {PROFILE} from  '../../actions/Profile/ActionTypes'

const initialState = {
    userData : {},
    error : false,
    loading : false
}

const ProfileReducer  = (state=initialState,action) => {
    switch(action.type){
        case PROFILE:
        return {
            ...state,
            userData : action.payload,
            error : false,
            loading : false
        }   
    }
}

export default ProfileReducer;  