import Reducer from "./RootReducer";

import {thunk} from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, legacy_createStore as createStore } from "redux";

const ReduxStore = createStore(
  Reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default ReduxStore;
