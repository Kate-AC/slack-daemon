import * as React from "react";
import ReactDOM from "react-dom";
import ConfigWindow from "browser_action/ConfigWindow";
require.context("../assets/scss/browser_action", true, /\.(sa|sc|c)ss$/);

(() => {
  ReactDOM.render(<ConfigWindow />, document.getElementById("root"));
})();
