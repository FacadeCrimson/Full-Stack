import {combineReducers} from 'redux'
import {handleActions} from 'redux-actions';
import {routerReducer} from 'react-router-redux';

import postsReducer from './postsReducer'

// INITIAL_APP_STATE
const initialAppState = {
    appName: 'tool-savvy',
    loaded: false
  }

const rootReducer = combineReducers({
      posts: postsReducer,
      app: handleActions({
        // empty
      }, initialAppState),
      routing: routerReducer
    })

export default rootReducer