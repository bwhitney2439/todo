import React, { useContext } from "react";
import Todo from "./todo";
import { TodoContext } from "./../contexts/TodoContext";

const todoList = () => {
  const { todos } = useContext(TodoContext);

  return todos.length ? (
    todos.map(todo => {
      return <Todo key={todo.id} todo={todo} />;
    })
  ) : (
    <div className="empty">No Books to read. Hello free time :-)</div>
  );
};

export default todoList;
