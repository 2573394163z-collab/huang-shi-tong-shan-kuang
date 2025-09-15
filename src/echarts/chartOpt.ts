import type {
  AngleAxisOption,
  GridOption,
  LegendOption,
  TooltipOption,
} from 'echarts/types/dist/shared';

export const grid: GridOption = {
  left: '6%',
  right: '6%',
  bottom: '5%',
  top: '10%',
  containLabel: true,
};
export const legend: LegendOption = {
  itemHeight: 24,
  itemWidth: 24,
  textStyle: {
    color: '#fff',
    fontSize: 24,
  },
};
export function tooltip(unit: string): TooltipOption {
  return {
    trigger: 'axis',
    // appendTo: 'body',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
    },
    textStyle: {
      fontSize: 30,
      // color: "#fff",
    },
    className: 'kt-echarts-tooltip',
    valueFormatter: value => value + unit,
  };
}

export const axisLine: AngleAxisOption['axisLine'] = {
  show: true,
  lineStyle: {
    color: '#fff',
  },
};

export const axisLabel: AngleAxisOption['axisLabel'] = {
  color: '#fff',
  fontSize: 12,
};

export const splitLine: AngleAxisOption['splitLine'] = {
  show: true,
  lineStyle: {
    type: 'solid',
    color: '#fff',
  },
};
