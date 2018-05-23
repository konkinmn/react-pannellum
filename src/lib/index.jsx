require('es6-object-assign').polyfill();

import React, { Component } from 'react';
import { PanoView, Container } from './styles';

import './pannellum.css';

const CAN_USE_DOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
const LibPannellum = CAN_USE_DOM ? require('./global-pannelum-scripts/libpannellum.js').default : null;
const Pannellum = CAN_USE_DOM ? require('./global-pannelum-scripts/pannellum.js').default : null;

class Panellum extends Component {
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
    loadButtonLabel: null,
    customControls: null,
    initFunction: null
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
    let config = {
      type: 'equirectangular',
      panorama: this.props.imagePath
    };

    Object.assign(config,
      this.props.hasOwnProperty("title") && { title: this.props.title },
      this.props.hasOwnProperty("author") && { author: this.props.author },
      this.props.hasOwnProperty("strings") && { strings: this.props.strings },
      this.props.hasOwnProperty("basePath") && { basePath: this.props.basePath },
      this.props.hasOwnProperty("autoLoad") && { autoLoad: this.props.autoLoad },
      this.props.hasOwnProperty("autoRotate") && { autoRotate: this.props.autoRotate },
      this.props.hasOwnProperty("autoRotateInactivityDelay") && { autoRotateInactivityDelay: this.props.autoRotateInactivityDelay },
      this.props.hasOwnProperty("autoRotateStopDelay") && { autoRotateStopDelay: this.props.autoRotateStopDelay },
      this.props.hasOwnProperty("fallback") && { fallback: this.props.fallback },
      this.props.hasOwnProperty("orientationOnByDefault") && { orientationOnByDefault: this.props.orientationOnByDefault },
      this.props.hasOwnProperty("showZoomCtrl") && { showZoomCtrl: this.props.showZoomCtrl },
      this.props.hasOwnProperty("keyboardZoom") && { keyboardZoom: this.props.keyboardZoom },
      this.props.hasOwnProperty("mouseZoom") && { mouseZoom: this.props.mouseZoom },
      this.props.hasOwnProperty("draggable") && { draggable: this.props.draggable },
      this.props.hasOwnProperty("disableKeyboardCtrl") && { disableKeyboardCtrl: this.props.disableKeyboardCtrl },
      this.props.hasOwnProperty("showFullScreenCtrl") && { showFullScreenCtrl: this.props.showFullScreenCtrl },
      this.props.hasOwnProperty("showControls") && { showControls: this.props.showControls },
      this.props.hasOwnProperty("yaw") && { yaw: this.props.yaw },
      this.props.hasOwnProperty("pitch") && { pitch: this.props.pitch },
      this.props.hasOwnProperty("hfov") && { hfov: this.props.hfov },
      this.props.hasOwnProperty("minYaw") && { minYaw: this.props.minYaw },
      this.props.hasOwnProperty("maxYaw") && { maxYaw: this.props.maxYaw },
      this.props.hasOwnProperty("minPitch") && { minPitch: this.props.minPitch },
      this.props.hasOwnProperty("maxPitch") && { maxPitch: this.props.maxPitch },
      this.props.hasOwnProperty("minHfov") && { minHfov: this.props.minHfov },
      this.props.hasOwnProperty("maxHfov") && { maxHfov: this.props.maxHfov },
      this.props.hasOwnProperty("compass") && { compass: this.props.compass },
      this.props.hasOwnProperty("northOffset") && { northOffset: this.props.northOffset },
      this.props.hasOwnProperty("preview") && { preview: this.props.preview },
      this.props.hasOwnProperty("previewTitle") && { previewTitle: this.props.previewTitle },
      this.props.hasOwnProperty("previewAuthor") && { previewAuthor: this.props.previewAuthor },
      this.props.hasOwnProperty("horizonPitch") && { horizonPitch: this.props.horizonPitch },
      this.props.hasOwnProperty("horizonRoll") && { horizonRoll: this.props.horizonRoll },
      this.props.hasOwnProperty("crossOrigin") && { crossOrigin: this.props.crossOrigin },
      this.props.hasOwnProperty("haov") && { haov: this.props.haov },
      this.props.hasOwnProperty("vaov") && { vaov: this.props.vaov },
      this.props.hasOwnProperty("vOffset") && { vOffset: this.props.vOffset },
      this.props.hasOwnProperty("ignoreGPanoXMP") && { ignoreGPanoXMP: this.props.ignoreGPanoXMP },
      this.props.hasOwnProperty("backgroundColor") && { backgroundColor: this.props.backgroundColor },
      this.props.hasOwnProperty("loadingLabel") && { loadingLabel: this.props.loadingLabel },
      this.props.hasOwnProperty("loadButtonLabel") && { loadButtonLabel: this.props.loadButtonLabel }
    );

    const viewer = window.pannellum.viewer('pano-image', config);
    if (this.props.initFunction) {
      this.props.initFunction(viewer);
    }
  };

  render() {
    const { width, height, maxWidth, maxHeight } = this.props;
    return (
      <Container width={width} height={height}>
        <PanoView maxWidth={maxWidth}
          maxHeight={maxHeight}
          id="pano-image">
          {this.props.customControls && this.props.customControls}
        </PanoView>
      </Container>
    );
  }
}

export default Panellum;