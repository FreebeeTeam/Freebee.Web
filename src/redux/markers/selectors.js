/* @flow */
import { createSelector } from 'reselect';
import { selectors as userSelectors } from '../user';
import type { Wifi } from '../../types/models';
import type { State } from './reducer';

type Selector = (state: {}) => any;

const rootSelector: Selector = (state): State => state.markers;

export const selectWifi: Selector = createSelector(
  rootSelector,
  (markers: State): Wifi[] => markers.wifi.markers,
);

export const selectToilets: Selector = createSelector(
  rootSelector,
  (markers: State) => markers.toilets.markers,
);

export const selectSockets: Selector = createSelector(
  rootSelector,
  (markers: State) => markers.sockets.markers,
);

export const selectWater: Selector = createSelector(
  rootSelector,
  (markers: State) => markers.water.markers,
);

export const selectIsAllMarkersFetching: Selector = createSelector(
  rootSelector,
  (markers: State): boolean => {
    return (
      markers.wifi.isFetching
    || markers.toilets.isFetching
    || markers.sockets.isFetching
    || markers.water.isFetching
    );
  },
);

export const selectFilter: Selector = createSelector(
  rootSelector,
  (markers: State) => markers.shared.selected,
);

const selectNewMarkerPosition = state => state.markers.shared.newMarkerPosition;

export const selectNewMarkerPositionInGeoJSON = createSelector(
  [selectNewMarkerPosition, userSelectors.selectUserCurrentLocation],
  (position, userPosition) => {
    return !position ? userPosition : position;
  },
);
