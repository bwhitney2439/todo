export const todoReducer = (state, action) => {
  switch (action.type) {
    case "INITIAL":
      return [...action.data];
    case "ADD_TODO":
      return [
        ...state,
        {
          content: action.content,
          id: action.id,
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
        todo.id === action.todo.id
          ? { ...todo, content: action.todo.content }
          : todo
      );
    case "TOGGLE_ALL":
      return state.map(todo => ({ ...todo, completed: action.toggleAll }));
    case "CLEAR_TODOS":
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
};
