import React from 'react';
import {Provider} from 'react-redux';
import { Reducer } from 'redux';
import {handleActions} from 'redux-actions';
import {routerReducer} from 'react-router-redux';
import {combineReducers, applyMiddleware, compose, createStore} from 'redux';
import {keplerGlReducer, enhanceReduxMiddleware, KeplerGl} from 'kepler.gl';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

// INITIAL_APP_STATE
const initialAppState = {
  appName: 'example',
  loaded: false
};

if ((process.env.REACT_APP_MAPBOX_TOKEN || '') === '' || process.env.REACT_APP_MAPBOX_TOKEN === 'PROVIDE_MAPBOX_TOKEN') {
    alert(process.env.REACT_APP_WARNING_MESSAGE);
}

  /** STORE **/
const reducers = (function createReducers() {
    return combineReducers({
      // mount keplerGl reducer
      keplerGl: keplerGlReducer.initialState({
        uiState: {
            activeSidePanel: null,  
            currentModal: null      
        }
      }) as Reducer<any,any>,
      app: handleActions({
        // empty
      }, initialAppState),
      routing: routerReducer
    });
}());

const middleWares = (function createMiddlewares() {
	return enhanceReduxMiddleware([
		// Add other middlewares here
	]);
}());

const enhancers = (function craeteEnhancers() {
	return applyMiddleware(...middleWares);
}());

export const store = (function createrReduxStore() {
	const initialState = {};
	return createStore(
		reducers,
		initialState,
		compose(enhancers)
	);
}());

export const Kepler = (function createReactReduxProvider() {
	return React.createElement(
	Provider,
	{store},
	<AutoSizer>
		{({height, width}:any) => (
			<KeplerGl
				mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
				id="map"
				width={width}
				height={height}
			/>  
		)}  
	</AutoSizer>)
}());