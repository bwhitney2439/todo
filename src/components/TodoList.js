import React from "react";
import Todo from "./Todo";
import { useAppState } from "../contexts";

const TodoList = () => {
  const { todos, activeFilter } = useAppState();

  const filteredTodos = todos.filter((todo) => {
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
      {filteredTodos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </React.Fragment>
  );
};

export default TodoList;
