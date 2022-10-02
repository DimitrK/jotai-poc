import React, { useCallback } from "react";
import { useUsersCollection } from "../../atoms/users";
import { useIncrementalId } from "../../hooks/useIncrementalId";
import "./styles.css";

export const UserForm = React.memo(() => {
  console.log("rendering UserForm");
  const [users, actions] = useUsersCollection();
  const createId = useIncrementalId();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      actions.addItem({
        id: createId(),
        ...Object.fromEntries(new FormData(event.target)),
      });
    },
    [actions, createId]
  );

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="John" type="text" required/>
      <input name="role" placeholder="Manager" type="text" required/>
      <button>Add User</button>
      <button
        type="button"
        disabled={users.length === 0}
        onClick={actions.empty}
      >
        Clear Users
      </button>
    </form>
  );
});
