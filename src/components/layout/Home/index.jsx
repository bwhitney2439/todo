import React from "react";
import AddTodo from "../../addTodo";
import TodoList from "../../todoList";

const Home = () => {
    return (
        <div className="container">
            <AddTodo />
            <TodoList />
        </div>
    );
};

export default Home;
