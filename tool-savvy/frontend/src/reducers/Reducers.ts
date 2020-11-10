import {combineReducers} from 'redux'
import {handleActions} from 'redux-actions';
import {routerReducer} from 'react-router-redux';

import postsReducer from './postsReducer'
import authReducer from './authReducer'

// INITIAL_APP_STATE
const initialAppState = {
    appName: 'tool-savvy',
    loaded: false
  }

const rootReducer = combineReducers({
      posts: postsReducer,
      auth:authReducer,
      app: handleActions({
        // empty
      }, initialAppState),
      routing: routerReducer
    })

export default rootReducer