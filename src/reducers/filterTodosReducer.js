const INITIAL_STATE = { activeFilter: "All" };

const filterTodosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FILTER_TODOS":
      return {
        ...state,
        activeFilter: action.activeFilter
      };
    default:
      return state;
  }
};

export default filterTodosReducer;
