import * as React from "react";
import ReactDOM from "react-dom";
import ConfigWindow from "./components/ConfigWindow";

require.context("./assets/scss/", true, /\.(sa|sc|c)ss$/);
require.context("./assets/js/", true, /\.(js|ts)$/);

(() => {
  ReactDOM.render(<ConfigWindow />, document.getElementById("root"));
})();
