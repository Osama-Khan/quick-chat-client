import { createContext } from "react";

export const UserContext = createContext();

export default function UserProvider({ value, children }) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
