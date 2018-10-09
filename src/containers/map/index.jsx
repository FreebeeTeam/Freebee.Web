// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { FreebeeMap } from '../../components';
import { wifiActions, toiletsActions } from '../../redux/actions';
import { wifisSelector, toiletsSelector, filterSelector } from '../../redux/selectors/markers';
import type { Wifi, Toilet } from '../../types/models';

type Props = {
  wifis?: Wifi[],
  toilets?: Toilet[],
  getWifis: () => void,
  getToilets: () => void,
};

class MapContainer extends PureComponent<Props> {
  static defaultProps = {
    wifis: [],
    toilets: [],
  }

  componentDidMount = () => {
    const { getWifis, getToilets } = this.props;

    getWifis();
    getToilets();
  }

  render() {
    const { wifis, toilets } = this.props;

    return (
      <FreebeeMap
        wifis={wifis}
        toilets={toilets}
      />
    );
  }
}


const mapStateToProps = (state) => {
  const filter = filterSelector(state);
  let wifis = [];
  let toilets = [];

  if (filter === null) {
    wifis = wifisSelector(state);
    toilets = toiletsSelector(state);
  }

  if (filter === 'wifi') {
    wifis = wifisSelector(state);
  }

  if (filter === 'toilet') {
    toilets = toiletsSelector(state);
  }

  return {
    wifis,
    toilets,
    filter,
  };
};

const { getWifiMarkers } = wifiActions;
const { getToiletMarkers } = toiletsActions;

const mapDispatchToProps = dispatch => ({
  getWifis: () => dispatch(getWifiMarkers()),
  getToilets: () => dispatch(getToiletMarkers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
