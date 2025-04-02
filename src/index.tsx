// Entry point of the application
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "./components/Detail";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import SearchPage from "./routes/SearchPage";

import "./index.css";
import { store } from "./store"; // central state management object of the app

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="search" element={<SearchPage />} />
            <Route path=":movieId" element={<Detail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
