import uuid from "uuid/v1";

export const todosReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          content: action.todo.content,
          id: uuid(),
          completed: false
        }
      ];
    case "REMOVE_TODO":
      return state.filter(todo => todo.id !== action.id);
    case "TOGGLE_TODO":
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "EDIT_TODO":
      return state.map(todo =>
        todo.id === action.id ? { ...todo, content: action.content } : todo
      );
    default:
      return state;
  }
};
