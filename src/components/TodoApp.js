import React from "react";
import AddTodo from "./addTodo";
// import TodoItem from "./todoItem";
import NavBar from "./navBar";
import Footer from "./footer";
import TodoList from "../components/todoList";

import TodoContextProvider from "../contexts/TodoContext";

const TodoApp = () => {
  return (
    <TodoContextProvider>
      <header>
        <NavBar />
        <h1 style={{ textAlign: "center" }}>todo</h1>
      </header>
      <div className="container">
        <AddTodo />
        <TodoList />
        <Footer />
      </div>
    </TodoContextProvider>
  );
};

export default TodoApp;
