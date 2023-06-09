import { Routes, Route } from "react-router-dom";
import App from "../App";
import Demostration from "../pages/Demostration";
import Index from "../pages/Index";
import Login from "../pages/login";
import Details from "../pages/details";

export default function RouterApp() {
  return (
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Index />} />
        <Route path="/details" element= {<Details/>} />
      </Route>
      <Route path="/register/login" element= {<Login/>} />
      <Route path="/demostration" element={<Demostration />} />
    </Routes>
  );
}
