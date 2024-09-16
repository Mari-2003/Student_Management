import { STUDENT } from "../Action";
import { DEFAULT_URL } from "../../components/api/API";
import { catchError } from "../../utils/Helper";
import {POST,GET,DELETE} from "../../components/axios/Axios" 

export const getAllStudentDetails = (callback = () => {})=>{
    return(dispatch) =>{
        GET(
        `${DEFAULT_URL}/admin/allStudent`,
        {},
        (response) => {
        dispatch({
          type: STUDENT.getAllStudent,
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

export const addStudentDetails = (data, callback = () => {}) => {
  return (dispatch) => {
      POST(
          `${DEFAULT_URL}/student`,
          data, // Pass data to the POST function
          (response) => {
              dispatch({
                  type: STUDENT.addStudent,
                  payload: response.data,
              });
              callback(null, response.data);
          },
          (error) => {
              callback(catchError(error));
          }
      );
  };
};

export const getClassDetails = (callback=()=>{})=>{
  return(dispatch) =>{
    GET(
    `${DEFAULT_URL}/class`,
    {},
    (response) => {
    dispatch({
      type: STUDENT.Class,
      payload: response.data,
    });
    callback(response.data);
  },
  (error) => {
    callback(catchError(error));
  }
    )
  }
}

export const getSectionDetails =(callback=()=>{})=>{
  return(dispatch) =>{
    GET(
    `${DEFAULT_URL}/section`,
    {},
    (response) => {
    dispatch({
      type: STUDENT.Section,
      payload: response.data,
    });
    callback(response.data);
  },
  (error) => {
    callback(catchError(error));
  }
    )
  }
}

export const getStudent = (id,callback=()=>{})=>{
  return(dispatch) =>{
    GET(
    `${DEFAULT_URL}/student/${id}`,
    {},
    (response) => {
    dispatch({
      type: STUDENT.getStudent,
      payload: response.data,
    });
    callback(response.data);
  },
  (error) => {
    callback(catchError(error));
  }
    )
  }
}

export const getCircular = (callback=()=>{})=>{
  return(dispatch) =>{
    GET(
    `${DEFAULT_URL}/std/circular`,
    {},
    (response) => {
    dispatch({
      type: STUDENT.getCircular,
      payload: response.data,
    });
    callback(response.data);
  },
  (error) => {
    callback(catchError(error));
  }
    )
  }
}

export const getFees = (callback=()=>{})=>{
  return(dispatch) =>{
    GET(
    `${DEFAULT_URL}/std/fees`,
    {},
    (response) => {
    dispatch({
      type: STUDENT.getFees,
      payload: response.data,
    });
    callback(response.data);
  },
  (error) => {
    callback(catchError(error));
  }
    )
  }
}


export const deleteCircular = (id, callback = () => {}) => {
  return (dispatch) => {
    DELETE(
      `${DEFAULT_URL}/student/circular/${id}`,

      {},
      (response) => {
        dispatch({
          type: STUDENT.deleteCircular,
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