import { ADMIN } from "../Action";

const initialState = {
    admin:null,
    adminLogin: [],
    addcircular : [],
    addFeesDetails: []

};

const AdminReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN.Login:
            return {
                ...state,
                adminLogin: action.payload
            };
            case ADMIN.getAdmin:
                return {
                    ...state,
                    admin: action.payload
                };
                case ADMIN.addCircular:
                    return {
                        ...state,
                        addcircualr: action.payload
                    };
                    case ADMIN.addFeesDetails:
                        return {
                            ...state,
                            addFeesDetails: action.payload
                        };
                  case ADMIN.getAllFees:
                    return {
                        ...state, 
                        getAllFees: action.payload
                    }      
        default:
            return state;
    }
};

export default AdminReducer;
