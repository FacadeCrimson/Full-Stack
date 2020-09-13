import React from 'react';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import * as KeplerGl from 'kepler.gl';
import {handleActions} from 'redux-actions';
import {routerReducer} from 'react-router-redux';

// INITIAL_APP_STATE
const initialAppState = {
  appName: 'example',
  loaded: false
};

if ((process.env.REACT_APP_MAPBOX_TOKEN || '') === '' || process.env.REACT_APP_MAPBOX_TOKEN === 'PROVIDE_MAPBOX_TOKEN') {
    alert(process.env.REACT_APP_WARNING_MESSAGE);
  }

  /** STORE **/
  const reducers = (function createReducers(redux, keplerGl) {
    return redux.combineReducers({
      // mount keplerGl reducer
      keplerGl: keplerGl.keplerGlReducer,
      app: handleActions({
        // empty
      }, initialAppState),
      routing: routerReducer
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

  export const store = (function createStore(redux, enhancers) {
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

    return function App() {
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
        {style: {position: 'absolute', left: 0, width: '100%', height: '100%'}},
        react.createElement(keplerGl.KeplerGl, {
          mapboxApiAccessToken: mapboxToken,
          id: "map",
          width: windowDimension.width,
          height: windowDimension.height
        })
      )
    }
  }(React, KeplerGl, process.env.REACT_APP_MAPBOX_TOKEN));

  export const Kepler = (function createReactReduxProvider(react, reactRedux, KeplerElement) {
    return react.createElement(
      reactRedux.Provider,
      {store},
      react.createElement(KeplerElement, null)
    )
  }(React, ReactRedux, KeplerElement));
  /** END COMPONENTS **/