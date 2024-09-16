import { STUDENT } from '../Action';

const initialState = {
    addStudent: null,
    getAllStudent: [],
    getStudent:null,
    getCircular:null,
    getFees:null,
    deleteCircular:null
};

const StudentReducer = (state = initialState, action) => {
    switch (action.type) {
        case STUDENT.getAllStudent:
            return { ...state, getAllStudent: action.payload };
        case STUDENT.addStudent:
            return { ...state, getAllStudent: action.payload };
        case STUDENT.getStudent:
            return { ...state, getStudent: action.payload };
        case STUDENT.getCircular:
            return { ...state, getCircular: action.payload };
        case STUDENT.getFees:
            return { ...state, getFees: action.payload };
        case STUDENT.deleteCircular:
            return { ...state, deleteCircular: action.payload };
        default:
           break;
    }
    return state;
};

export default StudentReducer;
