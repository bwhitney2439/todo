import React from "react";
import AddTodo from "../../addTodo";
import TodoList from "../../todoList";
import Filter from "../../Filter";

const Home = () => (
  <div className="container">
    <AddTodo />
    <TodoList />
    <Filter />
  </div>
);

export default Home;
