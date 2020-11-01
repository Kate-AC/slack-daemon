import * as React from "react";
import ReactDOM from "react-dom";
import App from "./App";

require.context("./assets/scss/", true, /\.(sa|sc|c)ss$/);
require.context("./assets/js/", true, /\.(js|ts)$/);

const ROOT_DOM_NAME = "slack-daemon-root";
const rootDom = document.createElement("div");

rootDom.setAttribute("id", ROOT_DOM_NAME);
document.body.append(rootDom);

ReactDOM.render(<App />, document.getElementById(ROOT_DOM_NAME));
