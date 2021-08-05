import { deepAssign } from '../../utils';
import { DEFAULT_OPTIONS as POINT_DEFAULT_OPTIONS } from '../point-map/constants';
import { PointCloudMapOptions } from './interface';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<PointCloudMapOptions> = deepAssign({}, POINT_DEFAULT_OPTIONS, {
  shape: 'dot',
  size: 1,
});
