import React from "react";
import TodoItem from "./todoItem";

const TodoList = ({ todoItems, deleteTodoItem }) => {
  const renderedTodos = todoItems.map(todoItem => {
    return (
      <TodoItem
        key={todoItem.id}
        todoItem={todoItem}
        deleteTodoItem={deleteTodoItem}
      />
    );
  });

  return (
    <section className="main">
      <div>{renderedTodos}</div>
    </section>
  );
};

export default TodoList;
