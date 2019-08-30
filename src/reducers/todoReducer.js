const initState = {
  todos: [
    { id: "1", completed: false, content: "make tea" },
    { id: "2", completed: false, content: "eat chocolate" },
    { id: "3", completed: false, content: "laugh out loud" }
  ]
};

const todoReducer = (state = initState, action) => {
  return state;
};

export default todoReducer;
