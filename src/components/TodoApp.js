import React from "react";
import AddTodo from "./addTodo";
import Footer from "./footer";
import TodoList from "../components/todoList";
import TodoContextProvider from "../contexts/TodoContext";
import NavigationBar from "./navigationBar";

const TodoApp = () => {
  return (
    <TodoContextProvider>
      <header>
        <NavigationBar />
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
