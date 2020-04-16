export const addTodo = (content) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("todos")
      .add({
        content,
        completed: false,
      })
      .then(() => {
        dispatch({ type: "ADD_TODO", content });
      })
      .catch((err) => {
        dispatch({ type: "ADD_TODO_ERROR", err });
      });
  };
};

export const toggleTodo = (todoitem) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection("todos").doc(todoitem.id).update({
      completed: !todoitem.completed,
    });
  };
};

export const deleteTodo = (todoitem) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.delete({ collection: "todos", doc: todoitem.id });
  };
};

export const toggleAllComplete = (toggleAll) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const todos = getState().firestore.ordered.todos;
    todos.forEach((todo) => {
      firestore.collection("todos").doc(todo.id).update({
        completed: toggleAll,
      });
    });
  };
};

export const filterTodos = (activeFilter) => ({
  type: "FILTER_TODOS",
  activeFilter,
});

export const clearTodoItems = () => ({
  type: "CLEAR_TODOS",
});

export const editTodo = (content, id) => ({
  type: "EDIT_TODO",
  content,
  id,
});
