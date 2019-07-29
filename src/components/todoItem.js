import React from "react";

const TodoItem = ({ todoItem, onTodoDelete }) => {
  return (
    <div className="item">
      <div className="ui massive icon input">
        <input tyape="text" placeholder={todoItem} />
        <i className="close icon" />
      </div>
    </div>
  );
};

export default TodoItem;
