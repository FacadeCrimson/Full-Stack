import React, {useState, useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import Redux from 'redux';
import ReactRedux from 'react-redux';
import KeplerGl from 'kepler.gl';
import  ReactDOM from 'react-dom';

const Map: React.FC = () => {

  if ((process.env.REACT_APP_MAPBOX_TOKEN || '') === '' || process.env.REACT_APP_MAPBOX_TOKEN === 'PROVIDE_MAPBOX_TOKEN') {
    alert(process.env.REACT_APP_WARNING_MESSAGE);
  }

  /** STORE **/
  const reducers = (function createReducers(redux, keplerGl) {
    return redux.combineReducers({
      // mount keplerGl reducer
      keplerGl: keplerGl.keplerGlReducer.initialState({
        uiState: {
          readOnly: true,
          currentModal: null
        }
      })
    });
  }(Redux, KeplerGl));

  const middleWares = (function createMiddlewares(keplerGl) {
    return keplerGl.enhanceReduxMiddleware([
      // Add other middlewares here
    ]);
  }(KeplerGl));

  const enhancers = (function craeteEnhancers(redux, middles) {
    return redux.applyMiddleware(...middles);
  }(Redux, middleWares));

  const store = (function createStore(redux, enhancers) {
    const initialState = {};

    return redux.createStore(
      reducers,
      initialState,
      redux.compose(enhancers)
    );
  }(Redux, enhancers));
  /** END STORE **/

  /** COMPONENTS **/
  var KeplerElement = (function makeKeplerElement(react, keplerGl, mapboxToken) {
    var LogoSvg = function LogoSvg() {
      return react.createElement(
        "div",
        { className: "logo-container", style: {position: 'fixed', zIndex: 10000, padding: '4px'} },
          react.createElement(
            "svg",
            {
              className: "kepler_gl__logo",
              width: "107px",
              height: "21px",
              viewBox: "0 0 124 24"
            },
            react.createElement(
              "g",
              { transform: "translate(13.500000, 13.500000) rotate(45.000000) translate(-13.500000, -13.500000) translate(4.000000, 4.000000)" },
              react.createElement("rect", { x: "0", y: "6", transform: "matrix(2.535181e-06 1 -1 2.535181e-06 18.1107 6.0369)", fill: "#535C6C", width: "12.1", height: "12.1" }),
              react.createElement("rect", { x: "6", y: "0", transform: "matrix(2.535182e-06 1 -1 2.535182e-06 18.1107 -6.0369)", fill:"#1FBAD6", width: "12.1", height: "12.1" })
            ),
            react.createElement(
              "g",
              {},
              react.createElement("path", { fill:"#1FBAD6", d: "M39,8.7h2.2l-2.8,4.2l2.9,5.1H39l-2.4-4.2h-1.3V18h-2V5l2-0.1v7.3h1.3L39,8.7z" }),
              react.createElement("path", { fill:"#1FBAD6", d: "M42.4,13.3c0-1.5,0.4-2.7,1.1-3.5s1.8-1.2,3.1-1.2c1.3,0,2.2,0.4,2.8,1.1c0.6,0.7,0.9,1.8,0.9,3.3 c0,0.4,0,0.8,0,1.1h-5.8c0,1.6,0.8,2.4,2.4,2.4c1,0,2-0.2,2.9-0.6l0.2,1.7c-0.4,0.2-0.9,0.4-1.4,0.5s-1.1,0.2-1.7,0.2 c-1.5,0-2.6-0.4-3.3-1.2C42.8,16.1,42.4,14.9,42.4,13.3z M46.6,10.1c-0.7,0-1.2,0.2-1.5,0.5c-0.4,0.4-0.6,0.9-0.6,1.7h4 c0-0.8-0.2-1.4-0.5-1.7S47.2,10.1,46.6,10.1z" }),
              react.createElement("path", { fill:"#1FBAD6", d: "M57.1,18.2c-1,0-1.8-0.3-2.3-0.9l0,0l0,1.3v2.5h-2V8.7h1.5l0.3,0.9h0c0.3-0.3,0.7-0.6,1.2-0.7 c0.4-0.2,0.9-0.3,1.4-0.3c1.2,0,2.1,0.4,2.7,1.1c0.6,0.7,0.9,2,0.9,3.7c0,1.6-0.3,2.8-1,3.7C59.2,17.8,58.3,18.2,57.1,18.2z M56.7,10.3c-0.4,0-0.8,0.1-1.1,0.2c-0.3,0.2-0.6,0.4-0.8,0.7v4.3c0.2,0.3,0.4,0.5,0.7,0.7c0.3,0.2,0.7,0.3,1.1,0.3 c0.7,0,1.2-0.2,1.6-0.7c0.4-0.5,0.5-1.3,0.5-2.5c0-0.8-0.1-1.4-0.2-1.8s-0.4-0.7-0.7-0.9C57.6,10.4,57.2,10.3,56.7,10.3z" }),
              react.createElement("path", { fill:"#1FBAD6", d: "M63.2,16V5l2-0.1v10.8c0,0.3,0.1,0.5,0.2,0.6c0.1,0.1,0.3,0.2,0.6,0.2c0.3,0,0.6,0,0.9-0.1V18 c-0.4,0.1-1,0.2-1.6,0.2c-0.8,0-1.3-0.2-1.7-0.5S63.2,16.8,63.2,16z" }),
              react.createElement("path", { fill:"#1FBAD6", d: "M68.2,13.3c0-1.5,0.4-2.7,1.1-3.5c0.7-0.8,1.8-1.2,3.1-1.2c1.3,0,2.2,0.4,2.8,1.1c0.6,0.7,0.9,1.8,0.9,3.3 c0,0.4,0,0.8,0,1.1h-5.8c0,1.6,0.8,2.4,2.4,2.4c1,0,2-0.2,2.9-0.6l0.2,1.7c-0.4,0.2-0.9,0.4-1.4,0.5s-1.1,0.2-1.7,0.2 c-1.5,0-2.6-0.4-3.3-1.2C68.6,16.1,68.2,14.9,68.2,13.3z M72.4,10.1c-0.7,0-1.2,0.2-1.5,0.5c-0.4,0.4-0.6,0.9-0.6,1.7h4 c0-0.8-0.2-1.4-0.5-1.7S73,10.1,72.4,10.1z" }),
              react.createElement("path", { fill:"#1FBAD6", d: "M80.2,8.7l0.1,1.7h0c0.3-0.6,0.7-1.1,1.1-1.4c0.4-0.3,1-0.5,1.6-0.5c0.4,0,0.7,0,1,0.1l-0.1,2 c-0.3-0.1-0.7-0.2-1-0.2c-0.7,0-1.3,0.3-1.7,0.8c-0.4,0.5-0.7,1.2-0.7,2.1V18h-2V8.7H80.2z" }),
              react.createElement("path", { fill:"#1FBAD6", d: "M83.8,17c0-0.8,0.4-1.2,1.2-1.2c0.8,0,1.2,0.4,1.2,1.2c0,0.8-0.4,1.1-1.2,1.1C84.2,18.2,83.8,17.8,83.8,17z" }),
              react.createElement("path", { fill:"#1FBAD6", d: "M88.5,18.7c0-0.8,0.4-1.4,1.2-1.8c-0.6-0.3-0.9-0.8-0.9-1.5c0-0.7,0.4-1.2,1.1-1.6c-0.3-0.3-0.6-0.6-0.7-0.9 c-0.2-0.4-0.2-0.8-0.2-1.3c0-1,0.3-1.8,0.9-2.3c0.6-0.5,1.6-0.8,2.8-0.8c0.5,0,1,0,1.4,0.1c0.4,0.1,0.8,0.2,1.1,0.4l2.4-0.2v1.5 h-1.5c0.2,0.4,0.2,0.8,0.2,1.3c0,1-0.3,1.7-0.9,2.2s-1.5,0.8-2.7,0.8c-0.7,0-1.2-0.1-1.6-0.2c-0.1,0.1-0.2,0.2-0.3,0.3 c-0.1,0.1-0.1,0.2-0.1,0.4c0,0.2,0.1,0.3,0.2,0.4c0.1,0.1,0.3,0.2,0.6,0.2l2.7,0.2c1,0.1,1.7,0.3,2.2,0.6c0.5,0.3,0.8,0.9,0.8,1.7 c0,0.6-0.2,1.1-0.5,1.5c-0.4,0.4-0.9,0.8-1.5,1c-0.7,0.2-1.5,0.4-2.4,0.4c-1.3,0-2.3-0.2-3-0.6C88.8,20.1,88.5,19.5,88.5,18.7z M95.1,18.4c0-0.3-0.1-0.5-0.3-0.7s-0.6-0.2-1.1-0.3l-2.7-0.3c-0.2,0.1-0.4,0.3-0.5,0.5c-0.1,0.2-0.2,0.4-0.2,0.6 c0,0.4,0.2,0.8,0.5,1c0.4,0.2,1,0.3,1.8,0.3C94.2,19.5,95.1,19.2,95.1,18.4z M94.3,11.5c0-0.6-0.1-1-0.4-1.2 c-0.3-0.2-0.7-0.3-1.3-0.3c-0.7,0-1.1,0.1-1.4,0.3c-0.3,0.2-0.4,0.6-0.4,1.2s0.1,1,0.4,1.2c0.3,0.2,0.7,0.3,1.4,0.3 c0.6,0,1.1-0.1,1.3-0.4S94.3,12,94.3,11.5z" }),
              react.createElement("path", { fill:"#1FBAD6", d: "M99.4,16V5l2-0.1v10.8c0,0.3,0.1,0.5,0.2,0.6c0.1,0.1,0.3,0.2,0.6,0.2c0.3,0,0.6,0,0.9-0.1V18 c-0.4,0.1-1,0.2-1.6,0.2c-0.8,0-1.3-0.2-1.7-0.5S99.4,16.8,99.4,16z" })
            )
          )
        );
      };

    return function App() {
      var rootElm = react.useRef(null);
      var _useState = react.useState({
        width: window.innerWidth,
        height: window.innerHeight
      });
      var windowDimension = _useState[0];
      var setDimension = _useState[1];
      react.useEffect(function sideEffect(){
        function handleResize() {
          setDimension({width: window.innerWidth, height: window.innerHeight});
        };
        window.addEventListener('resize', handleResize);
        return function() {window.removeEventListener('resize', handleResize);};
      }, []);
      return react.createElement(
        'div',
        {style: {position: 'absolute', left: 0, width: '100vw', height: '100vh'}},
        LogoSvg(),
        react.createElement(keplerGl.KeplerGl, {
          mapboxApiAccessToken: mapboxToken,
          id: "map",
          width: windowDimension.width,
          height: windowDimension.height
        })
      )
    }
  }(React, KeplerGl, process.env.REACT_APP_MAPBOX_TOKEN));

  const app = (function createReactReduxProvider(react, reactRedux, KeplerElement) {
    return react.createElement(
      reactRedux.Provider,
      {store},
      react.createElement(KeplerElement, null)
    )
  }(React, ReactRedux, KeplerElement));
  /** END COMPONENTS **/


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <app></app>
      </IonContent>

    </IonPage>
  );
};

export default Map;
