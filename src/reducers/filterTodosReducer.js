const INITIAL_STATE = { activeFilter: "All" };

const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FILTER_ALL":
      return [
        ...state,
        {
          id: action.id,
          content: action.content,
          completed: false
        }
      ];
    case "TOGGLE_TODO":
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "TOGGLE_ALL":
      return state.map(todo => ({ ...todo, completed: action.toggleAll }));
    default:
      return state;
  }
};

export default todoReducer;
