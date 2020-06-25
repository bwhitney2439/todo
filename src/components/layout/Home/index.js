import React from "react";
import AddTodo from "../../AddTodo";
import TodoList from "../../TodoList";
import Filter from "../../Filter";
import "./index.css";
import NavBar from "../Header/NavBar";

const Home = () => (
  <>
    <NavBar />
    <div className="container">
      <AddTodo />
      <TodoList />
      <Filter />
    </div>
  </>
);

export default Home;
