import { deepMix, isEqual } from '@antv/util';

/**
 * 深克隆图层配置项
 */
export const deepMergeLayerOptions = <O extends { source: any }>(options: Partial<O>, srcOptions: Partial<O>): O => {
  const { source, ...restOptions } = options;
  const { source: srcSource, ...restSrcOptions } = srcOptions;
  const target = { ...deepMix(restOptions, restSrcOptions), source: { ...source, ...srcSource } };

  return target;
};

/**
 * 判断 source 数据是否发生改变
 */
export const isSourceChanged = <S extends { data: any } = { data: any }>(source: S, currentSource: S) => {
  const { data, ...restOptions } = source;
  const { data: currentData, ...restCurrentOptions } = currentSource;
  const changed = data !== currentData || !isEqual(restOptions, restCurrentOptions);

  return changed;
};