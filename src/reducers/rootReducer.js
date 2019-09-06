import authReducer from "./authReducer";
import todoReducer from "./todoReducer";
import { combineReducers } from "redux";
import filterTodosReducer from "./filterTodosReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todoReducer,
  activeFilter: filterTodosReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
