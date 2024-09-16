import { combineReducers } from 'redux';
import AdminReducer from './reducer/AdminReducer';

const RootReducer = combineReducers({
    Admin: AdminReducer

});

export default RootReducer;