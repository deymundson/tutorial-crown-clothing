import { Routes, Route } from "react-router";
import { Authentication, Checkout, Home, Navigation, Shop } from "./routes";

const App = () => {
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
