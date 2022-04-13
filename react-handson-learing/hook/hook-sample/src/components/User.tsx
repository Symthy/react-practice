import { useReducer, VFC } from "react";


const firstUser = {
  id: "",
  firstName: "SYM",
  lastName: "THY",
  city: "Tokyo",
  state: "Japan",
  admin: false,
}

type UserData = typeof firstUser;

export const User: VFC = () => {
  const [user, setUser] = useReducer((user: UserData, newDetails: Partial<UserData>) =>
    ({ ...user, ...newDetails }), firstUser);

  //const onClick = () => setUser({ ...user, admin: true })
  const onClick = () => setUser({ admin: true });

  return (
    <div>
      <h1>{user.firstName}{user.lastName} - {user.admin ? "Admin" : "User"}</h1>
      <p>Location: {user.city}, {user.state}</p>
      <button onClick={onClick}>Make Admin</button>
    </div>
  );
}
