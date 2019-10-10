import React from "react";
import AddTodo from "./addTodo";
import Footer from "./footer";
import TodoList from "../components/todoList";
import TodoContextProvider from "../contexts/TodoContext";
import NavigationBar from "./navigationBar";
import SignIn from "./signIn";

const TodoApp = () => {
  return (
    <TodoContextProvider>
      <header>
        <NavigationBar />
        <SignIn />
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
