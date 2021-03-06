// @flow
import _ from 'lodash';
import {
  NETWORK_ERROR_MESSAGE, NETWORK_ERROR_MESSAGE_RU,
  GEOLOCATION_ERRORS,
} from './const';
import { sharedActions } from '../shared';

const middleware = store => next => (action) => {
  const hasError = action.error
    || _.get(action, 'payload.error', false);
  if (hasError) {
    const { payload } = action;
    if (payload.message && payload.message === NETWORK_ERROR_MESSAGE) {
      store.dispatch(sharedActions.setError(NETWORK_ERROR_MESSAGE_RU));
    }
    if (payload.geolocationErrorCode) {
      const errorMessage = GEOLOCATION_ERRORS[payload.geolocationErrorCode];
      store.dispatch(sharedActions.setError(errorMessage));
    }
  }

  return next(action);
};

export default middleware;
