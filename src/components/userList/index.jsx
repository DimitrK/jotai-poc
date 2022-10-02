import React from "react";
import { UserListItem } from "../userListItem";
import { useUsersCollection } from "../../atoms/users";

export const UserList = React.memo(() => {
  console.log("rendering Users");
  const [usersCollection, actions] = useUsersCollection();

  return (
    <div>
      <div className="table">
        {usersCollection.map((user) => (
          <UserListItem
            key={`${JSON.stringify(user)}`}
            user={user}
            actions={actions}
          />
        ))}
      </div>
    </div>
  );
});
