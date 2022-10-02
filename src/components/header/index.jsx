import React from "react";
import { useUsersCollection } from "../../atoms/users";

export const Header = React.memo(() => {
  console.log("rendered Header");
  const [usersCollection] = useUsersCollection();

  return (
    <h2>
      Users <small>({usersCollection.length})</small>
    </h2>
  );
});
