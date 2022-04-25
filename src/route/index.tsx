import React, {Suspense, useEffect} from 'react';
import {Spin} from "antd";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

interface IProps {
  name?: string
}

export const baseName = "/html/test";
const Router: React.FC<IProps> = (props: IProps) => {
  useEffect(() => {
    console.log(props)
  }, []);
  const Spinner = () => (
    <Spin
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    />
  );
  return (
    <div>
      <Suspense fallback={Spinner}>
        <BrowserRouter basename={baseName}>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/login" />
            </Route>
            <Route
              path="/login"
              exact
              component={React.lazy(
                () => import(/* webpackChunkName: "login" */ "@/pages/Login/login")
              )}/>
            <Route
              path="/home"
              exact
              component={React.lazy(
                () => import(/* webpackChunkName: "login" */ "@/pages/Home")
              )}/>
            <Route
              path="/drag"
              exact
              component={React.lazy(
                () => import(/* webpackChunkName: "login" */ "@/pages/Drag")
              )}/>
            <Route
              path="/codemirror"
              exact
              component={React.lazy(
                () => import(/* webpackChunkName: "codemirror" */ "@/pages/Edit/codemirror")
              )}/>
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
};
export default Router;
