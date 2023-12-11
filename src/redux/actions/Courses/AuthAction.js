import{
COURSE
} from './ActionTypes'
import axios from axios

export const getCourseContent = () => {
    return async(dispatch) => {
        try{
            const response = await axios.get("https://backend.iigminstitute.com/api/courses/getCourse/IIGM");
            dispatch({
                type : COURSE,
                payload : response.data.course
            });
        }catch(error){
            console.error('Error fething course data',error);   
        }
    }
}