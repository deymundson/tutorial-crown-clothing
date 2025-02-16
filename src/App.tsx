import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router";
import { Spinner } from "./components";
import { checkUserSession } from "./store";

const Authentication = lazy(() => import("./routes/authentication"));
const Checkout = lazy(() => import("./routes/checkout"));
const Home = lazy(() => import("./routes/home"));
const Navigation = lazy(() => import("./routes/navigation"));
const Shop = lazy(() => import("./routes/shop"));

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="shop/*" element={<Shop />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
