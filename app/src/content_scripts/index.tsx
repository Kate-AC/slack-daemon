import * as React from "react";
import ReactDOM from "react-dom";
import App from "content_scripts/App";
require.context("../assets/scss/content_scripts", true, /\.(sa|sc|c)ss$/);

const ROOT_DOM_NAME = "slack-daemon-root";
const rootDom = document.createElement("div");

rootDom.setAttribute("id", ROOT_DOM_NAME);
document.body.append(rootDom);

ReactDOM.render(<App />, document.getElementById(ROOT_DOM_NAME));
