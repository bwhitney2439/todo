import { useState, useEffect } from "react";

import firebase from "../config/firebase";

export const useTodos = authUser => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    firebase
      .todos()
      .where("userID", "==", authUser.uid)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });

        setTodos(data);
      });
  }, []);

  const getTodos = authUser => {
    firebase.user(authUser.uid);
  };

  const addTodo = content => {
    firebase.todos().add({ completed: false, content });
  };

  const toggleTodo = todo => {
    firebase.todo(todo.id).update({ completed: !todo.completed });
  };

  const toggleAllTodos = toggleAll => {
    todos.forEach(todo => {
      firebase.todo(todo.id).update({ completed: toggleAll });
    });
  };

  const editTodo = (id, content) => {
    firebase.todo(id).update({ content: content });
  };

  const deleteTodo = id => {
    firebase.todo(id).delete();
  };

  const clearTodos = () => {
    todos
      .filter(todo => todo.completed === true)
      .forEach(todo => {
        firebase.todo(todo.id).delete();
      });
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    toggleAllTodos,
    editTodo,
    deleteTodo,
    clearTodos
  };
};

export const useAuth = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth.onAuthStateChanged(user => {
      setAuthUser(!!user);
      console.log(user);
    });

    return () => unregisterAuthObserver();
  }, []);

  return authUser;
};
