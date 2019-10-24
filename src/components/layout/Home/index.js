import React from "react";
import AddTodo from "../../AddTodo";
import TodoList from "../../TodoList";
import Filter from "../../Filter";
import "./index.css";

const Home = () => (
  <div className="container">
    <AddTodo />
    <TodoList />
    <Filter />
  </div>
);

export default Home;
