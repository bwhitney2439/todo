import React from "react";
import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import ToDo from "./ToDo";
import { useTodos } from "../Hooks";
import { AuthUserContext } from "../contexts/AuthUserContext";

const TodoList = () => {
  const { activeFilter } = useContext(TodoContext);
  const authUser = useContext(AuthUserContext);

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
        <ToDo key={todo.id} todo={todo} />
      ))}
    </React.Fragment>
  );
};

export default TodoList;
