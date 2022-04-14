import React, {Suspense, useEffect} from 'react';
import {Spin} from "antd";
import {BrowserRouter, Route, Switch} from "react-router-dom";

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
            <Route
              path="/login"
              exact
              component={React.lazy(
                () => import(/* webpackChunkName: "login" */ "../pages/Login/login")
              )}/>
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
};
export default Router;
