import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Admin from "./screens/Admin";
import Home from "./screens/Home";
// import NotFound from "./screens/NotFound";
import Presale from "./screens/Presale";
import routes from "./constants/routes";
import Preloader from "./components/Preloader";

export default function App() {
  const [showPreloader, togglePreloader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      togglePreloader(false);
    }, 1000);
  }, []);

  return (
    <>
      {showPreloader && <Preloader />}
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.presale} element={<Presale />} />
          <Route path={routes.admin} element={<Admin />} />
          {/* <Route path={routes.notFound} element={<NotFound />} />  */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
