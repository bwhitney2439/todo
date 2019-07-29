import React from "react";

const TodoItem = props => {
  return (
    <form className="ui form">
      <div className="item">
        <div className="field ui massive icon input">
          <input tyape="text" value={props.todoItem} />
          <i className="close icon" />
        </div>
      </div>
    </form>
  );
};

export default TodoItem;
