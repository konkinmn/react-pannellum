import React from "react";
import { render } from "react-dom";
import Panellum from "../lib";

function Demo() {
  return (
    <div>
      <h1>Demo with examples of the Pannellum react component</h1>
      <Panellum />
    </div>
  );
}

render(<Demo />, document.getElementById("app"));
