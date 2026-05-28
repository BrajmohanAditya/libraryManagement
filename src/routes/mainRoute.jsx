import { Routes, Route } from "react-router-dom";
import UserLayout from "../layout/userLayout";
import Home from "../pages/home";

const MainRoutes = () => {
  return (
    <Routes>
      {/* This Route acts as the layout wrapper for all routes inside it */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;


