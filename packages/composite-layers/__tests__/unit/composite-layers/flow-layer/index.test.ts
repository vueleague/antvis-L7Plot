import { FlowLayer } from '../../../../src/composite-layers/flow-layer';
import { DataProvider } from '../../../../src/composite-layers/flow-layer/data';
import { FlowDataProviderState, FlowLayerOptions, FlowSource } from '../../../../src/composite-layers/flow-layer/types';
import {
  DefaultScaleType,
  getColorAttribute,
  getSizeAttribute,
} from '../../../../src/composite-layers/flow-layer/utils';

const flowSource: FlowSource = {
  data: [
    { weight: '5501', f_lon: '121.5838545', f_lat: '31.14749588', t_lon: '121.6664482', t_lat: '31.14343923' },
    { weight: '5290', f_lon: '121.6664482', f_lat: '31.14343923', t_lon: '121.5838545', t_lat: '31.14749588' },
    { weight: '5209', f_lon: '121.3630337', f_lat: '30.72855814', t_lon: '121.4291376', t_lat: '31.15148107' },
    { weight: '4985', f_lon: '121.4291376', f_lat: '31.15148107', t_lon: '121.3630337', t_lat: '30.72855814' },
    { weight: '3972', f_lon: '121.8100774', f_lat: '31.15285522', t_lon: '121.8154177', t_lat: '31.13785948' },
    { weight: '3926', f_lon: '121.4901223', f_lat: '31.22812638', t_lon: '121.4858528', t_lat: '31.23867577' },
    { weight: '3775', f_lon: '121.8100774', f_lat: '31.15285522', t_lon: '121.8164774', t_lat: '31.13345342' },
    { weight: '3743', f_lon: '121.8089762', f_lat: '31.15023081', t_lon: '121.8154177', t_lat: '31.13785948' },
    { weight: '3655', f_lon: '121.8089762', f_lat: '31.15023081', t_lon: '121.8164774', t_lat: '31.13345342' },
    { weight: '3487', f_lon: '121.8089762', f_lat: '31.15023081', t_lon: '121.8186382', t_lat: '31.13167215' },
    { weight: '3402', f_lon: '121.5110947', f_lat: '31.10513713', t_lon: '121.5238634', t_lat: '31.0663601' },
    { weight: '3380', f_lon: '121.7146803', f_lat: '31.3894142', t_lon: '121.6684618', t_lat: '31.30740288' },
    { weight: '3309', f_lon: '121.8100774', f_lat: '31.15285522', t_lon: '121.8186382', t_lat: '31.13167215' },
    { weight: '3254', f_lon: '121.5110947', f_lat: '31.10513713', t_lon: '121.520615', t_lat: '31.06551356' },
    { weight: '2961', f_lon: '121.8089762', f_lat: '31.15023081', t_lon: '121.8143166', t_lat: '31.1352345' },
    { weight: '2799', f_lon: '121.8100774', f_lat: '31.15285522', t_lon: '121.8143166', t_lat: '31.1352345' },
    { weight: '2707', f_lon: '121.4858528', f_lat: '31.23867577', t_lon: '121.4750121', t_lat: '31.23351389' },
    { weight: '2622', f_lon: '121.6163564', f_lat: '31.13496709', t_lon: '121.6282794', t_lat: '31.12874112' },
    { weight: '2583', f_lon: '121.6026647', f_lat: '31.21315281', t_lon: '121.6341416', t_lat: '31.20506045' },
  ],
  parser: {
    type: 'json',
    x: 'f_lon',
    y: 'f_lat',
    x1: 't_lon',
    y1: 't_lat',
    weight: 'weight',
  },
};

const dataProviderState: FlowDataProviderState = {
  mapStatus: {
    zoom: 10.68,
    bounds: [121.489159, 31.053299, 121.779643, 31.279859],
  },
  clusterType: 'HCA',
  clusterZoomStep: 1,
  clusterNodeSize: 64,
  clusterRadius: 40,
  clusterExtent: 512,
  maxTopFlowNum: 5000,
  maxZoom: 20,
  minZoom: 0,
};

const layerOptions: FlowLayerOptions = {
  source: flowSource,
  circleColor: {
    field: 'weight',
    value: ['#f00', '#0f0'],
  },
  circleRadius: {
    field: 'weight',
    value: [1, 20],
  },
  circleOpacity: 0.5,
  circleStrokeWidth: 2,
  circleStrokeColor: '#f00',
  lineOpacity: 0.7,
  locationNameColor: '#0f0',
  locationNameSize: 12,
};

describe('flow layer', () => {
  const layer = new FlowLayer(layerOptions);

  const dataProvider = new DataProvider();

  it('layer', () => {
    expect(layer.circleLayer?.type).toBe('pointLayer');
    expect(layer.lineLayer?.type).toBe('lineLayer');
  });

  it('data', () => {
    expect(dataProvider.getClusterLevels(flowSource, dataProviderState).length).toBe(10);
    expect(dataProvider.getFilterLocations(flowSource, dataProviderState).length).toBe(7);
    expect(dataProvider.getFilterFlows(flowSource, dataProviderState).length).toBe(4);
  });

  it('circle style', () => {
    layer.update({});
    expect(layer.circleLayer?.options['style'].opacity).toBe(0.5);
    expect(layer.circleLayer?.options['style'].strokeWidth).toBe(2);
    expect(layer.circleLayer?.options['style'].stroke).toBe('#f00');
  });

  test('unit style', () => {
    expect(getSizeAttribute(10, [0, 100])).toEqual(10);
    expect(getSizeAttribute({ field: 'weight', value: [0, 10] }, [0, 100])).toEqual({
      field: 'weight',
      value: [0, 10],
      scale: {
        field: 'size',
        type: DefaultScaleType,
        domain: [0, 100],
      },
    });

    expect(getColorAttribute('#f00', [0, 100])).toEqual('#f00');
    expect(getColorAttribute({ field: 'weight', value: ['#f00', '#0f0'] }, [0, 100])).toEqual({
      field: 'weight',
      value: ['#f00', '#0f0'],
      scale: {
        field: 'color',
        type: DefaultScaleType,
        domain: [0, 100],
      },
    });
  });
});
