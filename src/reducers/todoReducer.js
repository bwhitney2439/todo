const INITIAL_STATE = [
  { id: "1", completed: false, content: "make tea" },
  { id: "2", completed: false, content: "eat chocolate" },
  { id: "3", completed: false, content: "laugh out loud" }
];

const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_TODO":
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
    case "DELETE_TODO":
      return state.filter(todo => todo.id !== action.id);
    case "TOGGLE_ALL":
      return state.map(todo => ({ ...todo, completed: action.toggleAll }));
    default:
      return state;
  }
};

export default todoReducer;
