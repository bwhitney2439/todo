import React from "react";
import AddTodo from "./addTodo";
import Footer from "./footer";
import TodoList from "../components/todoList";
import TodoContextProvider from "../contexts/TodoContext";
import MyNavBar from "./myNavBar";

const TodoApp = () => {
  return (
    <TodoContextProvider>
      <header>
        <MyNavBar />

      </header>
      <br />
      <div className="container">
        <AddTodo />
        <TodoList />
        <Footer />
      </div>
    </TodoContextProvider>
  );
};

export default TodoApp;
