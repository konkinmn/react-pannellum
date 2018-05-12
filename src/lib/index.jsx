require('es6-object-assign').polyfill();

import React, {Component} from 'react';
import { PanoView, Container } from './styles';

import './pannellum.css';

const CAN_USE_DOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
const LibPannellum = CAN_USE_DOM ? require('./global-pannelum-scripts/libpannellum.js').default : null;
const Pannellum = CAN_USE_DOM ? require('./global-pannelum-scripts/pannellum.js').default : null;

class Panellum extends Component {
  state = {
    gyroPresent: false
  };

  static defaultProps = {
    imagePath: ' https://pannellum.org/images/alma.jpg',
    title: '',
    author: '',
    strings: null,
    basePath: null,
    autoLoad: false,
    autoRotate: 0,
    autoRotateInactivityDelay: 0,
    autoRotateStopDelay: 0,
    fallback: null,
    orientationOnByDefault: false,
    showZoomCtrl: false,
    keyboardZoom: true,
    mouseZoom: false,
    draggable: true,
    disableKeyboardCtrl: false,
    showFullScreenCtrl: false,
    showControls: false,
    yaw: 0,
    pitch: 0,
    hfov: 100,
    minYaw: -180,
    maxYaw: 180,
    minPitch: -90,
    maxPitch: 90,
    minHfov: 50,
    maxHfov: 120,
    compass: null,
    northOffset: 0,
    preview: '',
    previewTitle: null,
    previewAuthor: null,
    horizonPitch: 0,
    horizonRoll: 0,
    crossOrigin: 'anonymous',
    haov: 360,
    vaov: 180,
    vOffset: 0,
    ignoreGPanoXMP: false,
    backgroundColor: [0, 0, 0],
    loadingLabel: null,
    loadButtonLabel: null
  };

  componentDidMount() {
    if (!Pannellum || !LibPannellum) {
      return;
    }

    window.addEventListener("devicemotion", function (event) {
      if (event.rotationRate.alpha || event.rotationRate.beta || event.rotationRate.gamma)
        this.setState({
          gyroPresent: true
        });
    });

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
    let config = {
      type: 'equirectangular',
      panorama: this.props.imagePath
    };

    Object.assign(config,
      this.props.title && { title: this.props.title },
      this.props.author && { author: this.props.author },
      this.props.strings && { strings: this.props.strings },
      this.props.basePath && { basePath: this.props.basePath },
      this.props.autoLoad && { autoLoad: this.props.autoLoad },
      this.props.autoRotate && { autoRotate: this.props.autoRotate },
      this.props.autoRotateInactivityDelay && { autoRotateInactivityDelay: this.props.autoRotateInactivityDelay },
      this.props.autoRotateStopDelay && { autoRotateStopDelay: this.props.autoRotateStopDelay },
      this.props.fallback && { fallback: this.props.fallback },
      this.props.orientationOnByDefault && this.state.gyroPresent && { orientationOnByDefault: this.props.orientationOnByDefault },
      this.props.showZoomCtrl && { showZoomCtrl: this.props.showZoomCtrl },
      this.props.keyboardZoom && { keyboardZoom: this.props.keyboardZoom },
      this.props.mouseZoom && { mouseZoom: this.props.mouseZoom },
      this.props.draggable && { draggable: this.props.draggable },
      this.props.disableKeyboardCtrl && { disableKeyboardCtrl: this.props.disableKeyboardCtrl },
      this.props.showFullScreenCtrl && { showFullScreenCtrl: this.props.showFullScreenCtrl },
      this.props.showControls && { showControls: this.props.showControls },
      this.props.yaw && { yaw: this.props.yaw },
      this.props.pitch && { pitch: this.props.pitch },
      this.props.hfov && { hfov: this.props.hfov },
      this.props.minYaw && { minYaw: this.props.minYaw },
      this.props.maxYaw && { maxYaw: this.props.maxYaw },
      this.props.minPitch && { minPitch: this.props.minPitch },
      this.props.maxPitch && { maxPitch: this.props.maxPitch },
      this.props.minHfov && { minHfov: this.props.minHfov },
      this.props.maxHfov && { maxHfov: this.props.maxHfov },
      this.props.compass && { compass: this.props.compass },
      this.props.northOffset && { northOffset: this.props.northOffset },
      this.props.preview && { preview: this.props.preview },
      this.props.previewTitle && { previewTitle: this.props.previewTitle },
      this.props.previewAuthor && { previewAuthor: this.props.previewAuthor },
      this.props.horizonPitch && { horizonPitch: this.props.horizonPitch },
      this.props.horizonRoll && { horizonRoll: this.props.horizonRoll },
      this.props.crossOrigin && { crossOrigin: this.props.crossOrigin },
      this.props.haov && { haov: this.props.haov },
      this.props.vaov && { vaov: this.props.vaov },
      this.props.vOffset && { vOffset: this.props.vOffset },
      this.props.ignoreGPanoXMP && { ignoreGPanoXMP: this.props.ignoreGPanoXMP },
      this.props.backgroundColor && { backgroundColor: this.props.backgroundColor },
      this.props.loadingLabel && { loadingLabel: this.props.loadingLabel },
      this.props.loadButtonLabel && { loadButtonLabel: this.props.loadButtonLabel }
    );
    window.pannellum.viewer('pano-image', config);
  };

  render() {
    const {width, height, maxWidth, maxHeight} = this.props;
    return (
      <Container width={width} height={height}>
        <PanoView maxWidth={ maxWidth }
                  maxHeight={ maxHeight }
                  id="pano-image"/>
      </Container>
    );
  }
}

export default Panellum;