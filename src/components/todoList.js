import React from "react";
import TodoItem from "./todoItem";

const TodoList = props => {
  const renderedTodos = props.todoItems.map(todoitem => {
    return <TodoItem todoItem={todoitem} />;
  });
  return <div>{renderedTodos}</div>;
};

export default TodoList;
