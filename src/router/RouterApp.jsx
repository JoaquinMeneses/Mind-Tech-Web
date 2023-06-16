import { Routes, Route } from "react-router-dom";
import App from "../App";
import Demostration from "../pages/Demostration";
import Index from "../pages/Index";
import AuthForm from "../pages/Auth";
import Details from "../pages/details";
import Store from "../pages/Store";
import Admin from "../pages/AdminPanel";
import Checkout from "../components/Checkout";
import { Success, Failure, Pending } from "../pages/MercadoPago";

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
    logout,
    selectCheckboxes,
    setSelectCheckboxes,
    deleteProducts,
    createProduct,
    useFavoritesStore,
  } = useStore();
  return (
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Index />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />
        <Route path="/pending" element={<Pending />} />
      </Route>
      <Route path="/auth-form" element={<AuthForm />} />
     
      <Route
        path="/store"
        element={
          <Store allProducts={allProducts} getAllProducts={getAllProducts} />
        }
      />
      <Route
        path="/admin"
        element={
          <Admin
            useFavoritesStore={useFavoritesStore}
            allProducts={allProducts}
            getAllProducts={getAllProducts}
            deleteProducts={deleteProducts}
            createProduct={createProduct}
          />
        }
      />
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
    </Routes>
  );
}
