import React from "react";
import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import Todo from "./todo";
import { useTodos } from "../Hooks";

const TodoList = () => {
  const { authUser, activeFilter } = useContext(TodoContext);

  const { todos } = useTodos(authUser);

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
