import React from "react";
import TodoItem from "./todoItem";

const TodoList = ({ todoItems, onTodoDelete }) => {
  const renderedTodos = todoItems.map(todoItem => {
    return (
      <TodoItem
        key={todoItem}
        todoItem={todoItem}
        onTodoDelete={onTodoDelete}
        value={todoItem}
      />
    );
  });

  return <div>{renderedTodos}</div>;
};

export default TodoList;
