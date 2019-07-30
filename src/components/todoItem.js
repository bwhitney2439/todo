import React from "react";

const TodoItem = ({ deleteTodoItem, todoItem }) => {
  return (
    <div className="item">
      <div className="ui massive icon input">
        <input type="text" value={todoItem.content} readOnly={true} />

        <i
          className="close link icon"
          onClick={() => {
            deleteTodoItem(todoItem.id);
          }}
        />
      </div>
    </div>
  );
};

export default TodoItem;
