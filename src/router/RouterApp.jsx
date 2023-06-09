import { Routes, Route } from "react-router-dom";
import App from "../App";
import Demostration from "../pages/Demostration";
import Index from "../pages/Index";
import Login from "../pages/login";
import Store from "../pages/Store";

import useStore from "../store/store";

export default function RouterApp() {
  const {
    allProducts,
    getAllProducts,
    oneProduct,
    getOneProduct,
    user,
    getUser,
    token,
    login,
    logout
  } = useStore();

  return (
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Index />} />
      </Route>
      <Route path="/register/login" element={<Login />} />
      <Route
        path="/demostration"
        element={
          <Demostration
            allProducts={allProducts}
            getAllProducts={getAllProducts}
            oneProduct={oneProduct}
            getOneProduct={getOneProduct}
            user={user}
            getUser={getUser}
            token={token}
            login={login}
            logout={logout}
          />
        }
      />
      <Route path="/store" element={<Store />} />
    </Routes>
  );
}
