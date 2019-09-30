export const filterTodosReducer = (state, action) => {
  switch (action.type) {
    case "ALL":
      return "All";
    case "ACTIVE":
      return "Active";
    case "COMPLETED":
      return "Completed";
    default:
      return state;
  }
};
