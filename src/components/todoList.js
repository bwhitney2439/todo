import React from "react";
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import Todo from "./todo";

const TodoList = () => {
  const { todos, activeFilter, firebase } = useContext(TodoContext);
  const [currentTodos, setCurrentTodos] = useState([]);

  useEffect(() => {
    const unconditional = firebase.users().onSnapshot(snapshot => {
      console.log(snapshot);
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
