import React from "react";
import { useContext, useEffect } from "react";
import { TodoContext } from "../contexts/TodoContext";
import Todo from "./todo";

const TodoList = props => {
  const { todos, activeFilter } = useContext(TodoContext);
  const { firebase } = useContext(TodoContext);

  useEffect(() => {
    const unsubscribe = firebase.todos().onSnapshot(snapshot => {
      let newTodos = [];
      snapshot.forEach(doc => {});
    });
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (activeFilter) {
      case "Active":
        return !todo.completed;
      case "Completed":
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <React.Fragment>
      {filteredTodos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </React.Fragment>
  );
};

export default TodoList;
