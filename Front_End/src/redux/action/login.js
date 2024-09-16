import axios from "axios";

import { ADMIN } from "../Action";
import { DEFAULT_URL } from "../../components/api/API";
import { catchError } from "../../utils/Helper";

const Login = (data, role, callback= () => {})=>{
    return async (dispatch) => {
        try {
            const response = await axios.post(`${DEFAULT_URL}/${role}/login`, data,{
                crossDomain: true,
                headers: {
                  "Content-Type": "application/json",
                },
            });
            dispatch({ type: ADMIN.Login, payload: response.data });
            callback(null, response.data);
        } catch (error) {
            callback(catchError(error));
        }
    }
    
}


export default Login;