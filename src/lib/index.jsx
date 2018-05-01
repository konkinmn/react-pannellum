import React, { Component } from 'react';
import { PanoView, Container } from './styles';

import LibPannellum from './global-pannelum-scripts/libpannellum.js';
import Pannellum from './global-pannelum-scripts/pannellum.js';

import './pannellum.css';

class Panellum extends Component {
  static defaultProps = {
    imagePath         : 'https://pannellum.org/images/alma.jpg',
    autoLoad          : false,
    preview           : '',
    showControls      : false,
    showZoomCtrl      : false,
    showFullScreenCtrl: false,
    mouseZoom         : false
  };

  componentDidMount() {
    window.libpannellum = LibPannellum(window, document);
    window.pannellum = Pannellum(window, document);

    window.pannellum.viewer('pano-image', {
      type              : 'equirectangular',
      panorama          : this.props.imagePath,
      autoLoad          : this.props.autoLoad,
      preview           : this.props.preview,
      showControls      : this.props.showControls,
      showZoomCtrl      : this.props.showZoomCtrl,
      showFullScreenCtrl: this.props.showFullScreenCtrl,
      mouseZoom         : false
    });
  }

  render() {
    const { width, height } = this.props;
    return (
      <Container width={ width } height={ height }>
        <PanoView id="pano-image"/>
      </Container>
    );
  }
}

export default Panellum;