import authReducer from "./authReducer";
import todoReducer from "./todoReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todoReducer
});

export default rootReducer;
