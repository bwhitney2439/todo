import authReducer from "./authReducer";
import todoReducer from "./todoReducer";
import { combineReducers } from "redux";
import filterTodosReducer from "./filterTodosReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todoReducer,
  activeFilter: filterTodosReducer
});

export default rootReducer;
