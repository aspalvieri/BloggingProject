import React from "react";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";

const routes = {
    "/": () => <Home />,
    "/about": () => <About />,
    "/contact": () => <Contact />
};

export default routes;
