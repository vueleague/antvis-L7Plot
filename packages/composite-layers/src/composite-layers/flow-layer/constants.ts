import { LineLayerOptions } from '../../core-layers/line-layer/types';
import { PointLayerOptions } from '../../core-layers/point-layer/types';
import { FLowLayerActiveOptions, FlowLayerOptions } from './types';

export const EMPTY_CIRCLE_LAYER_SOURCE: PointLayerOptions['source'] = {
  data: [],
  parser: {
    type: 'json',
    x: 'lng',
    y: 'lat',
  },
};

export const EMPTY_LINE_LAYER_SOURCE: LineLayerOptions['source'] = {
  data: [],
  parser: {
    type: 'json',
    x: 'fromLng',
    y: 'fromLat',
    x1: 'toLng',
    y1: 'toLat',
  },
};

export const DEFAULT_FLOW_LAYER_ACTIVE_OPTIONS: FLowLayerActiveOptions = {
  enableCircleSpread: false,
  enableLineSpread: false,
  circleStrokeColor: '#ccc',
  lineStroke: '#ccc',
};

export const DEFAULT_FLOW_LAYER_SELECT_OPTIONS: FLowLayerActiveOptions = {
  ...DEFAULT_FLOW_LAYER_ACTIVE_OPTIONS,
  enableCircleSpread: true,
  enableLineSpread: true,
};

export const DEFAULT_OPTIONS: FlowLayerOptions = {
  source: {
    data: [],
    parser: {
      type: 'json',
      x: 'f_lon',
      y: 'f_lat',
      x1: 't_lon',
      y1: 't_lat',
      weight: 'weight',
    },
  },
  clusterType: 'HCA',
  clusterZoomStep: 1,
  clusterNodeSize: 64,
  clusterRadius: 40,
  clusterExtent: 512,
  maxTopFlowNum: 5000,
  circleColor: '#fff',
  circleRadius: {
    field: 'weight',
    value: [1, 16],
  },
  circleStrokeColor: '#000',
  circleStrokeWidth: 1,
  lineColor: {
    field: 'weight',
    value: ['#2a5674', '#d1eeea'],
  },
  lineWidth: {
    field: 'weight',
    value: [1, 16],
  },
  lineStroke: '#000',
  lineStrokeWidth: 1,
  fadeOpacityEnabled: true,
  fadeOpacityAmount: 0,
  showLocationName: false,
  locationNameSize: 12,
  locationNameColor: '#fff',
  locationNameStroke: '#000',
  locationNameStrokeWidth: 1,
  state: {
    active: DEFAULT_FLOW_LAYER_ACTIVE_OPTIONS,
    select: DEFAULT_FLOW_LAYER_SELECT_OPTIONS,
  },
};
