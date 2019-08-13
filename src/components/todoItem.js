import React from "react";

const TodoItem = ({ deleteTodoItem, todoItem, toggleComplete }) => {
  const iconClassName = `far ${
    todoItem.completed ? "fa-check-circle" : "fa-circle"
  } fa-w-14 fa-2x`;
  const inputClassName = todoItem.completed ? "input-completed" : "";
  return (
    <div className="input-container">
      <i onClick={() => toggleComplete(todoItem)} className={iconClassName} />
      <input
        className={inputClassName}
        type="text"
        value={todoItem.content}
        readOnly={true}
      />
      <i
        className="fas fa-times fa-w-14 fa-2x destroy"
        onClick={() => {
          deleteTodoItem(todoItem.id);
        }}
      />
    </div>
  );
};

export default TodoItem;
