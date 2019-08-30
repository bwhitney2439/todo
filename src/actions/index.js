export const addTodo = content => ({
  type: "ADD_TODO",
  id: Math.random(),
  content
});

export const toggleTodo = id => ({
  type: "TOGGLE_TODO",
  id
});

export const toggleAllComplete = toggleAll => ({
  type: "TOGGLE_ALL",
  toggleAll
});
