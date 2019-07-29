import React from "react";
import TodoItem from "./todoItem";

const TodoList = props => {
  const renderedTodos = props.todoItems.map(todoItem => {
    return (
      <TodoItem
        key={todoItem}
        todoItem={todoItem}
        onTodoDelete={props.onTodoDelete}
      />
    );
  });
  return <div>{renderedTodos}</div>;
};

export default TodoList;
