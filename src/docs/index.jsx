import React, {Component} from "react";
import { render } from "react-dom";
import Panellum from "../lib";

class Demo extends Component {
  state = {
    image: 'https://0.db-estate.cdn.pik-service.ru/attachment/0/2bdea7fd-a5f1-e511-b584-001ec9d5643c/1nm2_01_7b08cc7c12b02614db2a78244b611b52.jpg'
  };

  render() {
    return (
      <div>
        <h1>Demo with examples of the Pannellum react component</h1>
        <Panellum imagePath={ this.state.image } autoLoad={ true }/>
        <button onClick={ () => this.setState({ image: 'https://pannellum.org/images/alma.jpg' }) }>click</button>
      </div>
    );
  }
}

render(<Demo />, document.getElementById("app"));
