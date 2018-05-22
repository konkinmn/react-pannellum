import React, {Component} from "react";
import {render} from "react-dom";
import Panellum from "../lib";

import './styles.css';

class Demo extends Component {
  state = {
    image: 'https://0.db-estate.cdn.pik-service.ru/attachment/0/2bdea7fd-a5f1-e511-b584-001ec9d5643c/1nm2_01_7b08cc7c12b02614db2a78244b611b52.jpg'
    };

    getCustomControls() {
        return (
            <div id="controls">
                <div class="ctrl" id="pan-up">▲</div>
                <div class="ctrl" id="pan-down">▼</div>
                <div class="ctrl" id="pan-left">◀</div>
                <div class="ctrl" id="pan-right">▶</div>
                <div class="ctrl" id="zoom-in">+</div>
                <div class="ctrl" id="zoom-out">−</div>
                <div class="ctrl" id="fullscreen">⤢</div>
            </div>
            );
    }

  initControls(viewer) {
      document.getElementById('pan-up').addEventListener('click', function (e) {
          viewer.setPitch(viewer.getPitch() + 10);
      });
      document.getElementById('pan-down').addEventListener('click', function (e) {
          viewer.setPitch(viewer.getPitch() - 10);
      });
      document.getElementById('pan-left').addEventListener('click', function (e) {
          viewer.setYaw(viewer.getYaw() - 10);
      });
      document.getElementById('pan-right').addEventListener('click', function (e) {
          viewer.setYaw(viewer.getYaw() + 10);
      });
      document.getElementById('zoom-in').addEventListener('click', function (e) {
          viewer.setHfov(viewer.getHfov() - 10);
      });
      document.getElementById('zoom-out').addEventListener('click', function (e) {
          viewer.setHfov(viewer.getHfov() + 10);
      });
      document.getElementById('fullscreen').addEventListener('click', function (e) {
          viewer.toggleFullscreen();
      });
  }

  render() {
    return (
      <div>
        <h1>Demo with examples of the Pannellum react component</h1>
        <Panellum
          imagePath={this.state.image}
          autoLoad={true}
          autoRotate={-2}
          autoRotateInactivityDelay={2000}
          maxWidth={'1200px'}
          maxHeight={'1000px'}
          customControls={this.getCustomControls()}
          initFunction={this.initControls}
        />
        <button onClick={() => this.setState({image: 'https://pannellum.org/images/alma.jpg'})}>click</button>
      </div>
    );
  }
}

render(<Demo/>, document.getElementById("app"));
