import { Routes, Route } from "react-router";
import { Home, Navigation, SignIn } from "./routes";

const Shop = () => {
  return (
    <div>
      <h1>Shop</h1>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
