import React from "react";
import { RecoilRoot } from "recoil";
import "./app.less";

import "taro-ui/dist/style/index.scss";

function App(props: any) {
  return <RecoilRoot>{props.children}</RecoilRoot>;
}

export default App;
