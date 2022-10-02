import React, { useCallback } from "react";

export const UserListItem = React.memo(({ user, actions }) => {
  console.log("rendered for user.id = ", user.id);
  const handleUserRemove = useCallback(() => {
    actions.removeItem(user);
  }, [user, actions]);

  return (
    <>
      <div>
        <p>{JSON.stringify(user)}</p>
      </div>
      <div>
        <button onClick={handleUserRemove}>remove</button>
      </div>
    </>
  );
});
