import React, { useEffect } from "react";
import { useUsersCollection } from "./atoms/users";
import { UserList } from "./components/userList";
import { Header } from "./components/header";
import { UserForm } from "./components/userForm";
import { usersAtom } from "./atoms";
import "./app.css";

function App() {
  const [usersCollection, actions] = useUsersCollection();
  useEffect(() => {
    console.log("actions causing rerender");
  }, [actions]);

  useEffect(() => {
    console.log("App, usersAtom changed");
  }, [usersAtom]);

  useEffect(() => {
    console.log("usersCollection causing rerender");
  }, [usersCollection]);

  console.log("rendering app");

  return (
    <div>
      <div>
        <span>Count: {actions?.count?.()}</span>
        <Header />
      </div>
      <UserForm />
      <UserList />
    </div>
  );
}

export default App;
