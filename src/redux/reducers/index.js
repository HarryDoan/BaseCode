import * as constantsReducers from './combineReducers/constantsReducers';
import * as generalReducers from './combineReducers/generalReducers';
import * as otherReducers from './combineReducers/otherReducers';
import * as tokenReducers from './combineReducers/tokenReducers';
import * as userReducers from './combineReducers/userReducers';

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  ...generalReducers,
  ...userReducers,
  ...otherReducers,
  ...tokenReducers,
  ...constantsReducers,
});

export default rootReducer;
