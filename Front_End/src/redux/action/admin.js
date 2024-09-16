import { ADMIN } from "../Action";
import { DEFAULT_URL } from "../../components/api/API";
import { catchError } from "../../utils/Helper";
import {GET,POST} from "../../components/axios/Axios"

export const getAdmin = (callback = () => {})=>{
    return(dispatch) =>{
        GET(
        `${DEFAULT_URL}/admin`,
        {},
        (response) => {
        dispatch({
          type: ADMIN.getAdmin,
          payload: response.data,
        });
        callback(response.data);
      },
      (error) => {
        callback(catchError(error));
      }
        )
    }
};

export const addCircular = (data, classId, callback = () => {}) => {
  return (dispatch) => {
    POST(
      `${DEFAULT_URL}/circular?classId=${classId}`,
      data,
      {},
      (response) => {
        dispatch({
          type: ADMIN.addCircular,
          payload: response.data,
        });
        callback(response.data);
      },
      (error) => {
        callback(catchError(error));
      }
    );
  };
};  


export const addFeesDetails = (data, classId,sectionId, callback = () => {}) => {
  return (dispatch) => {
    POST(
      `${DEFAULT_URL}/fees?classId=${classId}&sectionId=${sectionId}`,
      data,
      {},
      (response) => {
        dispatch({
          type: ADMIN.addFeesDetails,
          payload: response.data,
        });
        callback(response.data);
      },
      (error) => {
        callback(catchError(error));
      }
    );
  };
};  
  
  export const getAllFees = (callback = () => {}) => {
    return (dispatch) => {
      GET(
        `${DEFAULT_URL}/admin/fees`,
        {},
        (response) => {
          dispatch({
            type: ADMIN.getAllFees,
            payload: response.data,
          });
          callback(response.data);
        },
        (error) => {
          callback(catchError(error));
        }
      );
    };
  };