/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FreebeeMap from './map';
import { selectors, thunks } from '../../redux/markers';
import { userActions } from '../../redux/user';
import {
  thunks as routingThunks,
  selectors as routingSelectors,
} from '../../redux/routing';
import type { Wifi, Toilet } from '../../types/models';

type Props = {
  wifi?: Wifi[],
  toilets?: Toilet[],
  route: any,
  getMarkers: () => void,
  getRoute: (number[], any) => void,
  setCurrentLocation: (position: number[] | string) => void,
  currentUserLocation: number[] | null,
};

class MapContainer extends Component<Props> {
  static defaultProps = {
    wifi: [],
    toilets: [],
  };

  componentDidMount() {
    const { getMarkers } = this.props;

    getMarkers();
    this.getUserLocation();
  }

  getUserLocation = () => {
    const { setCurrentLocation } = this.props;
    const nativeGeolocation = navigator.geolocation;
    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;

      setCurrentLocation([latitude, longitude]);
    };
    const errorCallback = (error) => {
      console.error(error);
      setCurrentLocation(error);
    };

    nativeGeolocation.getCurrentPosition(successCallback, errorCallback);
  };

  buildRoute = (marker) => {
    const { getRoute, currentUserLocation } = this.props;

    if (currentUserLocation !== null) {
      getRoute(currentUserLocation, marker);
    }
  };

  render() {
    const {
      wifi,
      toilets,
      currentUserLocation,
      route,
    } = this.props;

    return (
      <FreebeeMap
        wifi={wifi}
        toilets={toilets}
        route={route}
        userLocation={currentUserLocation}
        buildRoute={this.buildRoute}
      />
    );
  }
}

const {
  selectWifi,
  selectToilets,
  selectFilter,
} = selectors;

const mapState = (state) => {
  const filter = selectFilter(state);
  let wifi = [];
  let toilets = [];

  if (filter === null) {
    wifi = selectWifi(state);
    toilets = selectToilets(state);
  }

  if (filter === 'wifi') {
    wifi = selectWifi(state);
  }

  if (filter === 'toilet') {
    toilets = selectToilets(state);
  }

  return {
    wifi,
    toilets,
    filter,
    route: routingSelectors.selectRoute(state),
  };
};

const { getMarkers } = thunks;
const { getRoute } = routingThunks;
const { setCurrentLocation } = userActions;

const mapDispatch = dispatch => ({
  getMarkers: () => dispatch(getMarkers()),
  getRoute: (point0, point1) => dispatch(getRoute(point0, point1)),
  setCurrentLocation: (position: [] | string) => dispatch(setCurrentLocation(position)),
});

export default connect(mapState, mapDispatch)(MapContainer);
