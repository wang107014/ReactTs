import React from 'react';
import Router from "../src/route/index";
import { hot } from "react-hot-loader/root";

function App() {
  return <Router></Router>;
}
const AppHot = process.env.NODE_ENV === "development" ? hot(App) : App;
export default AppHot;
