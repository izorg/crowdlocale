import type firebase from "firebase";
import { ComponentType, createContext, FC, useContext, useRef } from "react";
import { useUser as useReactFireUser } from "reactfire";

const UserContext = createContext<firebase.User | null>(null);

export const useUser = (): firebase.User => {
  const user = useContext(UserContext);

  if (user === null) {
    throw new Error("No user");
  }

  return user;
};

const UserProvider: FC = ({ children }) => {
  const { data: user } = useReactFireUser();

  const userRef = useRef(user);

  if (user !== null) {
    userRef.current = user;
  }

  return (
    <UserContext.Provider value={userRef.current}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.displayName = "UserProvider";

export const withUser = (Component: ComponentType): ComponentType => {
  const WithUser = () => (
    <UserProvider>
      <Component />
    </UserProvider>
  );

  WithUser.displayName = `withUser(${Component.displayName})`;

  return WithUser;
};
