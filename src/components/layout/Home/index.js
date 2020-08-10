import React from "react";
import AddTodo from "../../AddTodo";
import Filter from "../../Filter";
import "./index.css";
import NavBar from "../Header/NavBar";
import Todo from "../../../components/Todo";
import { useAppState } from "../../../contexts";
import {
  useFirestore,
  useUser,
  useFirestoreDocData,
  useFirestoreCollectionData,
  useFirestoreCollection,
} from "reactfire";

const Home = () => {
  const { activeFilter } = useAppState();

  const user = useUser();

  const todosRef = useFirestore()
    .collection("Todos")
    .where("userId", "==", user.uid);

  const todosSnapshot = useFirestoreCollection(todosRef);

  const todos = todosSnapshot.docs.map((todo) => {
    return {
      id: todo.id,
      ...todo.data(),
    };
  });
  const filteredTodos = todos.filter((todo) => {
    switch (activeFilter) {
      case "Active":
        return !todo.completed;
      case "Completed":
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <>
      <div className="container">
        <AddTodo todos={todos} />
        {filteredTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
        <Filter todos={todos} />
      </div>
    </>
  );
};

export default Home;
