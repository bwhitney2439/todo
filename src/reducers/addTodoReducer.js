const INITIAL_STATE = { toggleAll: false };

const addTodoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOGGLE_SELECTALL":
      return {
        ...state,
        toggleAll: action.toggleAll
      };
    default:
      return state;
  }
};

export default addTodoReducer;
