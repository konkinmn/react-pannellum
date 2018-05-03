import React, {Component} from 'react';
import {PanoView, Container} from './styles';

import './pannellum.css';

const CAN_USE_DOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
const LibPannellum = CAN_USE_DOM ? require('./global-pannelum-scripts/libpannellum.js').default : null;
const Pannellum = CAN_USE_DOM ? require('./global-pannelum-scripts/pannellum.js').default : null;


class Panellum extends Component {
  static defaultProps = {
    imagePath: 'https://pannellum.org/images/alma.jpg',
    autoLoad: false,
    preview: '',
    loadingLabel: null,
    loadButtonLabel: null,
    showControls: false,
    showZoomCtrl: false,
    showFullScreenCtrl: false,
    mouseZoom: false
  };

  componentDidMount() {
    if (!Pannellum || !LibPannellum) {
      return;
    }

    window.libpannellum = LibPannellum(window, document);
    window.pannellum = Pannellum(window, document);
    this.initPanellum();
  }


  componentDidUpdate(prevProps) {
    if (prevProps.imagePath !== this.props.imagePath) {
      this.initPanellum();
    }
  }

  initPanellum = () => {
    window.pannellum.viewer('pano-image', {
      type: 'equirectangular',
      panorama: this.props.imagePath,
      autoLoad: this.props.autoLoad,
      preview: this.props.preview,
      showControls: this.props.showControls,
      showZoomCtrl: this.props.showZoomCtrl,
      showFullScreenCtrl: this.props.showFullScreenCtrl,
      mouseZoom: this.props.mouseZoom
    });
  };

  render() {
    const {width, height} = this.props;
    return (
      <Container width={width} height={height}>
        <PanoView id="pano-image"/>
      </Container>
    );
  }
}

export default Panellum;