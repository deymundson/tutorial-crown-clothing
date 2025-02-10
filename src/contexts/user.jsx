import { createContext, useEffect, useReducer } from "react";
import {
  createUserFromAuth,
  onAuthStateChangedListener,
} from "../backend/firebase";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

export const USER_ACTION_TYPES = {
  SET_USER: "SET_USER",
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_USER:
      return { ...state, user: payload };
    default:
      throw new Error(`Unhandled type in userReducer: ${type}`);
  }
};

const INITIAL_STATE = {
  user: null,
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { user } = state;
  const setUser = (user) =>
    dispatch({ type: USER_ACTION_TYPES.SET_USER, payload: user });

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserFromAuth(user);
      }
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
