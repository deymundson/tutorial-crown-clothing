import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router";
import {
  createUserFromAuth,
  onAuthStateChangedListener,
} from "./backend/firebase";
import { Authentication, Checkout, Home, Navigation, Shop } from "./routes";
import { setUser } from "./store";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserFromAuth(user);
      }
      dispatch(setUser(user));
    });
    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="shop/*" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
