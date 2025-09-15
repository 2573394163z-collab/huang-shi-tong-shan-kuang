import * as echarts from 'echarts';
import { axisLabel, axisLine, grid, splitLine, tooltip } from './chartOpt';

export function fa_guang_line(data, opt = {}) {
  const option = {
    color: ['rgba(180, 236, 255, 1)'],
    tooltip,
    grid,
    xAxis: [
      {
        type: 'category',
        data: data.xData,
        boundaryGap: true,
        axisTick: {
          show: false, // 不显示坐标轴刻度线
        },
        splitLine: {
          show: false,
        },
        axisLine,
        axisLabel,
      },
    ],
    yAxis: [
      {
        type: 'value',
        // y右侧文字
        axisLabel,
        axisLine,
        // y轴的分割线
        splitLine,
      },
    ],
    series: data.data.map((item) => {
      return {
        name: item.name,
        type: 'line',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        lineStyle: {
          width: 3,
          shadowColor: 'rgba(180, 236, 255, 1)',
          shadowBlur: 15,
        },
        data: item.value,
      };
    }),
  };
  return option;
}

export function pie1(data, opt = {}) {
  const {
    color = [
      'rgba(162,174,255,1)',
      'rgba(6,170,255,1)',
      'rgba(13, 235, 255, 1)',
    ],
  } = opt;
  const chartData = [];
  data.data.forEach((item) => {
    chartData.push({
      value: item.value,
      name: item.name,
    });
  });
  const colorList = color;
  const sum = chartData.reduce((per, cur) => per + cur.value, 0);
  console.log('chartData: ', chartData);
  const gap = (1 * sum) / 100;
  const pieData1 = [];
  const pieData2 = [];
  const gapData = {
    name: '',
    value: gap,
    itemStyle: {
      color: 'transparent',
    },
  };

  for (let i = 0; i < chartData.length; i++) {
    // 第一圈数据
    pieData1.push({
      ...chartData[i],
      itemStyle: {
        borderRadius: 10,
      },
    });
    pieData1.push(gapData);

    // 第二圈数据
    pieData2.push({
      ...chartData[i],
      itemStyle: {
        color: colorList[i],
        opacity: 0.21,
      },
    });
    pieData2.push(gapData);
  }
  const left = '25%';
  const top = '50%';
  const pieSiez = 70;
  return {
    title: {
      text: data.title,
      subtext: data.name,
      x: '23.5%',
      y: 'center',
      textStyle: {
        color: '#f5f5f6',
        fontSize: 12,
        fontWeight: 'bold',
      },
      subtextStyle: {
        color: '#f5f5f6',
        fontWeight: 'bold',
      },
      textAlign: 'center',
    },
    legend: {
      left: '50%',
      top: 'center',
      itemGap: 18,
      icon: 'circle',
      orient: 'vertical',
      formatter: (name) => {
        const item = chartData.find(e => e.name === name);
        let str = '';
        str = `{name|${item.name}}{line||}{value|${item.value}个}`;
        return str;
      },
      data: chartData.map((item, i) => {
        return {
          name: item.name,
          textStyle: {
            color: '#FFFFFF',
            rich: {
              name: {
                padding: [0, 0, 0, 8],
                fontSize: 14,
              },
              line: {
                padding: [0, 0, 0, 20],
                color: colorList[i],
                fontSize: 14,
                fontWeight: 'bold',
              },
              value: {
                padding: [0, 0, 0, 10],
                color: colorList[i],
                fontSize: 14,
                fontWeight: 'bold',
              },
            },
          },
        };
      }),
    },
    tooltip: {
      show: false,
    },
    color: colorList,
    series: [
      {
        name: '',
        type: 'pie',
        roundCap: true,
        radius: [`${pieSiez - 5}%`, `${pieSiez}%`],
        center: [left, top],
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: pieData1,
      },
      {
        type: 'pie',
        radius: [`${pieSiez - 10}%`, `${pieSiez - 5}%`],
        center: [left, top],
        gap: 1.71,
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        silent: true,
        data: pieData2,
      },
      {
        type: 'gauge',
        zlevel: 2,
        splitNumber: 90,
        radius: `${pieSiez - 2}%`,
        center: [left, top],
        startAngle: 90,
        endAngle: -269.9999,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: true,
          length: 2,
          lineStyle: {
            width: 2,
            color: 'rgba(92,116,139,1)',
          },
        },
        pointer: {
          show: 0,
        },
        detail: {
          show: 0,
        },
      },
      {
        type: 'pie',
        center: [left, '45%'],
        radius: [0, `${pieSiez - 20}%`],
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        itemStyle: {
          color: 'rgba(92,116,139,.1)',
        },
        silent: true,
        data: [
          {
            value: 100,
            name: '',
          },
        ],
      },
    ],
  };
}

export function tiao_wen(data, opt = {}) {
  const { unit = '' } = opt;
  const option = {
    grid,
    tooltip,
    xAxis: {
      type: 'category',
      data: data.xData,
      axisLine: {
        lineStyle: {
          color: 'rgba(52, 51, 51, 1)',
        },
      },
      splitLine: { show: false },
      axisLabel,
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      name: unit,
      nameTextStyle: {
        fontFamily: 'MicrosoftYaHei',
        fontSize: 12,
        color: 'rgba(113, 113, 113, 1)',
      },
      axisLine,
      splitLine,
      axisLabel,
      axisTick: { show: false },
    },
    series: [],
  };

  option.series = data.data.map((item) => {
    return {
      name: item.name,
      type: 'pictorialBar',
      legendHoverLink: false,
      symbolRepeat: 'true',
      symbolMargin: '20%',
      symbol: 'rect',
      symbolSize: [20, 5],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: 'rgba(110,211,255, 1)',
            },
            {
              offset: 0.98,
              color: 'rgba(214,242,255, 1)', // 100% 处的颜色
            },
          ],
          false,
        ),
      },
      data: item.value,
    };
  });
  return option;
}

export function zhu_zhuang(data, opt = {}) {
  const xData = data.xData; // 类型
  const { color = ['0, 188, 255', '126, 233, 255', '226, 149, 46'] } = opt;
  const seriousList = [];
  data.data.forEach((item, index) => {
    seriousList.push({
      name: item.name,
      label: {
        show: false,
      },
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: `rgba(${color[index]}, 0)`,
          },
          {
            offset: 1,
            color: `rgba(${color[index]}, 1)`,
          },
        ],
      },
      type: 'bar',
      barWidth: '20%', // 柱型宽度
      data: item.value,
    });
  });

  const option = {
    tooltip,
    grid,
    xAxis: [
      {
        type: 'category',
        axisLine,
        axisTick: {
          show: false,
        },
        axisLabel,
        data: xData,
      },
    ],
    yAxis: [
      {
        // name: '单位：人',
        nameTextStyle: {
          color: '#808080',
          fontSize: 12,
          fontFamily: 'Source Han Sans CN-Regular',
          align: 'left',
          padding: [0, 0, -5, 0],
        },
        type: 'value',
        splitLine,
        axisLabel,
        axisTick: {
          show: false,
        },
        axisLine,
      },
    ],
    series: seriousList,
  };

  return option;
}

/**
 * 3d柱状图
 * @date 2023-07-10
 * @returns {any}
 */
export function bar3d(data, obj = {}) {
  const {
    unit = '',
    tooltipUnit = '',
    extraUnit = '',
    yMax,
    unitStyle = {},
  } = obj;
  const xaxisData = data.xData;
  const yaxisData = data.data[0].value;

  const offsetX = 18 / 2;
  const offsetY = 9 / 2;
  // 绘制左侧面
  const CubeLeft = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath(ctx, shape) {
      // 会canvas的应该都能看得懂，shape是从custom传入的
      const xAxisPoint = shape.xAxisPoint;
      const c0 = [shape.x, shape.y];
      const c1 = [shape.x - offsetX, shape.y - offsetY];
      const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY];
      const c3 = [xAxisPoint[0], xAxisPoint[1]];
      ctx
        .moveTo(c0[0], c0[1])
        .lineTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .closePath();
    },
  });

  // 绘制右侧面
  const CubeRight = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath(ctx, shape) {
      const xAxisPoint = shape.xAxisPoint;
      const c1 = [shape.x, shape.y];
      const c2 = [xAxisPoint[0], xAxisPoint[1]];
      const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY];
      const c4 = [shape.x + offsetX, shape.y - offsetY];
      ctx
        .moveTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath();
    },
  });

  // 绘制顶面
  const CubeTop = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath(ctx, shape) {
      const c1 = [shape.x, shape.y];
      const c2 = [shape.x + offsetX, shape.y - offsetY]; // 右点
      const c3 = [shape.x, shape.y - offsetX];
      const c4 = [shape.x - offsetX, shape.y - offsetY];
      ctx
        .moveTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath();
    },
  });

  // 注册三个面图形
  echarts.graphic.registerShape('CubeLeft', CubeLeft);
  echarts.graphic.registerShape('CubeRight', CubeRight);
  echarts.graphic.registerShape('CubeTop', CubeTop);

  const option = {
    tooltip: {
      ...tooltip,
      extraCssText: 'box-shadow: 2px 2px 4px 0px rgba(0,0,0,0.3);',
      formatter: (params, ticket, callback) => {
        const item = params[1];
        return `${item.name} : ${item.value}${tooltipUnit}`;
      },
    },
    grid,
    xAxis: {
      name: extraUnit,
      nameTextStyle: {
        align: 'right',
        verticalAlign: 'top',
        color: '#fff',
        fontWeight: 400,
        fontSize: 13,
        lineHeight: 60,
      },
      type: 'category',
      data: xaxisData,
      axisLine: {
        show: false,
        lineStyle: {
          width: 1,
          color: '#545454',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel,
    },
    yAxis: {
      name: unit,
      type: 'value',
      max:
        yMax
        || ((data) => {
          return Number.parseInt(data.max * 1.4);
        }),
      nameTextStyle: Object.assign({}, unitStyle),
      axisLine: {
        show: false,
        lineStyle: {
          width: 1,
          color: '#545454',
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed', // 线的类型 虚线0
          opacity: 0.2, // 透明度
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel,
    },
    series: [
      {
        type: 'custom',
        renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)]);
          return {
            type: 'group',
            children: [
              {
                type: 'CubeLeft',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: `rgba(56,212,227,1)`,
                    },
                    // {
                    //   offset: 0.5,
                    //   color: `rgba(56,212,227,1)`,
                    // },
                    // {
                    //   offset: 0.95,
                    //   color: `rgba(0,11,30,.1)`
                    // },
                    {
                      offset: 1,
                      color: `rgba(0,11,30,.1)`,
                    },
                  ]),
                },
              },
              {
                type: 'CubeRight',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: `rgba(56,212,227,1)`,
                    },
                    // {
                    //   offset: 0.5,
                    //   color: `rgba(56,212,227,1)`,
                    // },
                    // {
                    //   offset: 0.95,
                    //   color: `rgba(0,11,30,.1)`
                    // },
                    {
                      offset: 1,
                      color: `rgba(0,11,30,.1)`,
                    },
                  ]),
                },
              },
              {
                type: 'CubeTop',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: 'rgba(56,212,227,1)',
                },
              },
            ],
          };
        },
        data: yaxisData,
      },
      {
        type: 'bar',
        itemStyle: {
          color: 'transparent',
        },
        label: {
          show: false,
          position: 'top',
          fontSize: 10,
          color: 'rgba(255,255,255,0.7)',
          offset: [0, -5],
        },
        data: yaxisData,
      },
    ],
  };
  return option;
}

// ****************************************************************************************************************************************

// 不规则饼图
export function pie2(res, opt = {}) {
  const data = res.data;
  const color = ['#38cafb', '#4caff9', '#4adeca', '#2aa7ee', '#0270f2', '#488cf7'];

  // 计算总数
  const total = data.map(v => v.value).reduce((o, n) => o + n);

  // 计算每一个data的其实角度和末了角度 θ1和θ2
  data.reduce((o, v) => {
    v.theta1 = o;
    v.theta2 = o + v.value / total;
    return v.theta2;
  }, 0);
  // 添加渐变
  data.forEach((v, i) => {
    if (v.value) {
      v.itemStyle = {
        color: color[i],
        borderColor: 'rgba(255,255,255,0.4)',
        borderWidth: 1,
      };
    }
  });
  const option = {
    grid: {
      left: -100,
      top: 50,
      bottom: 10,
      right: 10,
      // containLabel: true
    },
    tooltip: {
      ...tooltip,
      trigger: 'item',
      axisPointer: {
        type: 'shadow',
      },
    },
    calculable: true,
    series: [
      {
        type: 'pie',
        radius: '10%',
        hoverAnimation: false,
        labelLine: { show: false },
        itemStyle: { color: '#fff' },
        tooltip: { show: false },
        data: [0],
      },
      {
        type: 'pie',
        radius: ['15%', '16%'],
        hoverAnimation: false,
        labelLine: { show: false },
        itemStyle: { color: '#c2d7fd', opacity: 0.4 },
        tooltip: { show: false },
        data: [0],
      },
      {
        type: 'pie',
        radius: ['71%', '72%'],
        hoverAnimation: false,
        labelLine: { show: false },
        itemStyle: { color: '#b7cffc', opacity: 0.4 },
        tooltip: { show: false },
        data: [0],
      },
      {
        type: 'pie',
        name: res.title,
        radius: ['20%', '80%'],
        roseType: true,
        zlevel: 10,
        label: {
          formatter: (params) => {
            const datas = data;
            let target;
            let total = 0;
            for (let i = 0; i < datas.length; i++) {
              total += datas[i].value;
              if (datas[i].name === params.name) {
                target = datas[i].value;
              }
            }
            const arr = [
              `{a|${
                params.data.name
              }   ${
                ((target / total) * 100).toFixed(0)
              }%}`,
            ];
            return arr.join('\n');
          },
          rich: {
            a: {
              fontSize: 12,
              color: '#eef4ff',
              lineHeight: 50,
              align: 'left',
            },
          },
          height: 70,
          padding: [0, -30],
          distanceToLabelLine: 0,
          alignTo: 'labelLine',
        },
        labelLine: {
          length: 10,
          length2: 35,
          lineStyle: {
            color: 'rgba(255,255,255,0.4)',
            type: 'dashed',
          },
        },
        data,
      },
    ],
  };

  return option;
}

export function jian_bian_lian(data, opt = {}) {
  const option = {
    color: ['#1890FF'],
    tooltip,
    grid,
    xAxis: [
      {
        type: 'category',
        data: data.xData,
        boundaryGap: false,
        axisTick: {
          show: false, // 不显示坐标轴刻度线
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: 'rgba(230, 247, 255, 0.50)',
          fontSize: 14,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        // y右侧文字
        axisLabel,
        // y轴的分割线
        splitLine,
      },
    ],
    series: [
      {
        name: data.data[0].name,
        type: 'line',
        smooth: true,
        symbol: 'none', // 不显示连接点
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        lineStyle: {
          width: 0,
        },
        areaStyle: {
          opacity: 1,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(186, 215, 255, 1)',
            },
            {
              offset: 1,
              color: 'rgba(16, 127, 230, 0.62)',
            },
          ]),
        },
        data: data.data[0].value,
      },
    ],
  };
  return option;
}

export function bar3dto2(data, opt = {}) {
  const resultData = data.xData.map((x, i) => {
    return {
      name: x,
      num1: data.data[0].value[i],
      num2: data.data[1].value[i],
    };
  });
  const barWidth = 15;
  const colors = [];
  const colors1 = [];
  for (let i = 0; i < resultData.length; i += 1) {
    colors.push({
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(0, 208, 221, .8)', // 最左边
        },
        {
          offset: 0.5,
          color: 'rgba(0, 208, 221, .8)', // 左边的右边 颜色
        },
        {
          offset: 0.5,
          color: 'rgba(0, 208, 221, .8)', // 右边的左边 颜色
        },
        {
          offset: 1,
          color: 'rgba(0, 208, 221, .8)',
        },
      ],
    });
    colors1.push({
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(0, 147, 221, .8)', // 最左边
        },
        {
          offset: 0.5,
          color: 'rgba(0, 147, 221, .8)', // 左边的右边 颜色
        },
        {
          offset: 0.5,
          color: 'rgba(0, 147, 221, .8)', // 右边的左边 颜色
        },
        {
          offset: 1,
          color: 'rgba(0, 147, 221, .8)',
        },
      ],
    });
  }
  const option = {
    color: ['rgba(0, 208, 221, 1)', 'rgba(0, 147, 221, 1)'],
    dataset: [
      {
        source: resultData,
        dimensions: ['name', 'num1', 'num2'],
      },
    ],
    legend: {
      show: true,
      left: '25%',
      top: '5%',
      itemGap: 150,
      selectedMode: false,
      textStyle: {
        color: '#ffffff',
        fontSize: 15,
      },
    },
    // 提示框
    tooltip: {
      trigger: 'axis',
      formatter(params) {
        let result = '';
        const markerList = [];
        for (let i = 0; i < params.length; i += 1) {
          const { marker, seriesType } = params[i];
          if (seriesType === 'bar') {
            markerList.push(marker);
          }
        }
        if (params.length > 0 && markerList.length > 1) {
          const { data, seriesName } = params[0];
          const { seriesName: seriesName3 } = params[3];
          result += `${data.name}<br/>${markerList[0]}${seriesName}：${data.num1}<br/>${markerList[1]}${seriesName3}：${data.num2}`;
        }
        return result;
      },
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    // 区域位置
    grid: {
      left: '3%',
      right: '1%',
      bottom: '3%',
      top: '30%',
      containLabel: true,
    },
    // X轴
    xAxis: {
      type: 'category',
      axisLine,
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel,
    },
    yAxis: {
      show: true,
      splitNumber: 4,
      axisLine,
      splitLine,
      axisLabel: {
        ...axisLabel,
        formatter: '{value}%',
      },
    },
    series: [
      {
        type: 'bar',
        name: data.data[0].name,
        barWidth,
        itemStyle: {
          color(params) {
            return colors[params.dataIndex % 7];
          },
        },
        encode: {
          x: 'name',
          y: 'num1',
        },
      },

      {
        z: 2,
        type: 'pictorialBar',
        encode: {
          x: 'name',
          y: 'num1',
        },
        symbol: 'diamond',
        symbolOffset: ['-63%', '50%'],
        symbolSize: [barWidth, barWidth * 0.5],
        itemStyle: {
          color(params) {
            return colors[params.dataIndex % 7];
          },
        },
      },
      {
        z: 3,
        type: 'pictorialBar',
        symbolPosition: 'end',
        encode: {
          x: 'name',
          y: 'num1',
        },
        symbol: 'diamond',
        symbolOffset: ['-63%', '-50%'],
        symbolSize: [barWidth, barWidth * 0.5],
        itemStyle: {
          borderWidth: 0,
          color(params) {
            return colors[params.dataIndex % 7].colorStops[0].color;
          },
        },
      },
      {
        type: 'bar',
        name: data.data[1].name,
        barWidth,
        itemStyle: {
          color(params) {
            return colors1[params.dataIndex % 7];
          },
        },
        encode: {
          x: 'name',
          y: 'num2',
        },
      },
      {
        z: 2,
        type: 'pictorialBar',
        encode: {
          x: 'name',
          y: 'num2',
        },
        symbol: 'diamond',
        symbolOffset: ['63%', '50%'],
        symbolSize: [barWidth, barWidth * 0.5],
        itemStyle: {
          color(params) {
            return colors1[params.dataIndex % 7];
          },
        },
      },

      {
        z: 3,
        type: 'pictorialBar',
        symbolPosition: 'end',
        encode: {
          x: 'name',
          y: 'num2',
        },
        symbol: 'diamond',
        symbolOffset: ['62%', '-50%'],
        symbolSize: [barWidth, barWidth * 0.5],
        itemStyle: {
          borderWidth: 0,
          color(params) {
            return colors1[params.dataIndex % 7].colorStops[0].color;
          },
        },
      },
    ],
  };

  return option;
}

export function jian_bian_lian_op(data, opt = {}) {
  const xAxisData = data.xData;
  const seriesData = data.data[0].value;
  const option = {
    grid,
    tooltip,
    xAxis: {
      type: 'category',
      data: xAxisData,
      // x轴文字
      axisLabel,
      // x轴
      axisLine,
      // x轴刻度
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      // y轴 文字
      axisLabel,
      // y轴
      axisLine,
      // y轴横向 标线
      splitLine,
    },
    series: [
      {
        name: data.data[0].name,
        data: seriesData,
        type: 'line',
        lineStyle: {
          color: 'rgba(255,255,255,.7)',
          width: 1,
        },
        // 点
        showSymbol: false,
        // 平滑 属性
        smooth: true,
        symbol: 'none', // 不显示连接点
        // 区域黄色渐变效果
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(71,189,248, .7)',
              },
              {
                offset: 1,
                color: 'rgba(71,189,248, 0)',
              },
            ],
            false,
          ),
          shadowBlur: 5,
        },
      },
    ],
  };
  return option;
}

export function set_gcwjchart(data, options) {
  const tdata = [
    {
      name: '南京市',
      num: '1200',
    },
  ];

  function contains(arr, dst) {
    let i = arr.length;
    while (i > 0) {
      i -= 1;
      if (arr[i] === dst) {
        return i;
      }
    }
    return false;
  }

  const attackSourcesColor = [
    new echarts.graphic.LinearGradient(0, 1, 1, 1, [
      { offset: 0, color: '#EB3C5A' },
      { offset: 1, color: '#FD9A5A' },
    ]),
    new echarts.graphic.LinearGradient(0, 1, 1, 1, [
      { offset: 0, color: '#EEC146' },
      { offset: 1, color: '#FD9A5A' },
    ]),
    new echarts.graphic.LinearGradient(0, 1, 1, 1, [
      { offset: 0, color: '#F7B935' },
      { offset: 1, color: '#FEEB90' },
    ]),
    new echarts.graphic.LinearGradient(0, 1, 1, 1, [
      { offset: 0, color: '#395CFD' },
      { offset: 1, color: '#2EC2D1' },
    ]),
  ];
  const attackSourcesColor1 = [
    '#EB3B5A',
    '#FA8231',
    '#F7B731',
    '#3860FC',
    '#1089E7',
    '#F57474',
    '#56D0E3',
    '#1089E7',
    '#F57474',
    '#1089E7',
    '#F57474',
    '#F57474',
  ];
  const attaData = [];
  const attaName = [];
  const topName = [];
  tdata.forEach((it, index) => {
    attaData[index] = Number.parseFloat(it.num).toFixed(2);
    attaName[index] = it.num;
    topName[index] = `${it.name}`;
  });
  const salvProMax = []; // 背景按最大值
  for (let i = 0; i < attaData.length; i++) {
    salvProMax.push(Math.max(...attaData));
  }
  function attackSourcesDataFmt(sData) {
    const sss = [];
    sData.forEach((item, i) => {
      const itemStyle = {
        color: i > 3 ? attackSourcesColor[3] : attackSourcesColor[i],
      };
      sss.push({
        value: item,
        itemStyle,
      });
    });
    return sss;
  }

  const option = {
    tooltip: {
      show: false,
    },
    color: ['#F7B731'],
    grid: {
      left: '7%',
      right: '3%',
      width: '90%',
      bottom: '2%',
      top: '0%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',

      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      data: topName,
    },
    yAxis: [
      {
        // 名称
        type: 'category',
        offset: 36,
        position: 'left',
        axisLine: {
          show: false,
        },
        inverse: true,
        axisTick: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color(param, index) {
              if (index <= 2) {
                const color = ['#F15B5A', '#EEC146', '#F7B935'];
                return color[index];
              }
              else {
                return '#fff';
              }
            },
          },
          show: true,
          interval: 0,
          align: 'left',
          lineHeight: 32,
          fontSize: 12,
        },
        data: topName,
      },
      {
        type: 'category',
        inverse: true,
        axisTick: 'none',
        axisLine: 'none',
        show: true,
        axisLabel: {
          textStyle: {
            color: '#fff',
            fontSize: '12',
          },
        },
        data: attackSourcesDataFmt(attaName),
      },
      {
        type: 'category',
        inverse: true,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisPointer: {
          label: {
            show: false,
          },
        },
        pdaaing: [5, 0, 0, 0],
        postion: 'right',
        data: attaName,
        axisLabel: {
          show: false,
          margin: 10,
          align: 'left',
          color: 'red',
          rich: {
            nt1: {
              color: '#000',
              backgroundColor: attackSourcesColor1[0],
              width: 13,
              height: 13,
              fontSize: 12,
              align: 'center',
              borderRadius: 26,
              lineHeight: '5',
              padding: [0, 1, 2, 1],
            },
            nt2: {
              color: '#fff',
              backgroundColor: attackSourcesColor1[1],
              width: 13,
              height: 13,
              fontSize: 12,
              align: 'center',
              borderRadius: 100,
              padding: [0, 1, 2, 1],
            },
            nt3: {
              color: '#fff',
              backgroundColor: attackSourcesColor1[2],
              width: 13,
              height: 13,
              fontSize: 12,
              align: 'center',
              borderRadius: 100,
              padding: [0, 1, 2, 1],
            },
            nt: {
              color: '#fff',
              backgroundColor: attackSourcesColor1[3],
              width: 13,
              height: 13,
              fontSize: 12,
              align: 'center',
              // lineHeight: 3,
              borderRadius: 100,
              padding: [0, 1, 2, 1],
              lineHeight: 5,
            },
          },
          formatter(value, index) {
            index = contains(attaName, value) + 1;
            if (index - 1 < 3) {
              return [`{nt${index}|${index}}`].join('\n');
            }
            else {
              return [`{nt|${index}}`].join('\n');
            }
          },
        },
      },
    ],
    series: [
      {
        zlevel: 1,
        name: '',
        type: 'bar',
        barWidth: '10px',
        animationDuration: 1500,
        data: attackSourcesDataFmt(attaData),
        align: 'center',
        itemStyle: {
          borderRadius: 26,
        },
        label: {
          show: false,
          fontSize: 12,
          color: '#fff',
          padding: [2, 0, 0, 0],
        },
      },

      {
        name: '',
        type: 'bar',
        barWidth: 10,
        barGap: '-100%',
        // margin: '20',
        data: salvProMax,
        textStyle: {
          // 图例文字的样式
          fontSize: 12,
          color: '#fff',
        },
        itemStyle: {
          color: '#002994',
          fontSize: 12,
          borderRadius: 26,
        },
      },
    ],
  };

  return option;
}

export function xie_gang_zhu(data, options) {
  const myDate = data.xData;
  const numA = data.data[0].value;
  const numB = data.data[0].value.map(item => 0.2);
  const option = {
    tooltip: {
      show: false,
    },
    grid: {
      ...grid,
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitArea: {
          show: false,
        },
        axisLabel,
        axisLine,
        data: myDate,
      },
    ],
    yAxis: {
      type: 'value',
      nameTextStyle: {
        color: '#fff',
        fontSize: 14,
      },
      axisLine,
      splitLine,
      axisLabel,
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        name: '',
        type: 'bar',
        stack: '总量',
        barMaxWidth: 24,
        barGap: '10%',
        itemStyle: {
          show: true,
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(6, 124, 226, 0.83)',
              },
              {
                offset: 1,
                color: 'rgba(6, 124, 226, 0.31)',
              },
            ],
            false,
          ),
          borderRadius: 0,
          label: {
            show: true,
            position: 'top',
            color: 'rgba(39, 252, 254, 1)',
            formatter(p) {
              return p.value > 0 ? p.value : '';
            },
          },
        },
        data: numA,
      },
      {
        name: '',
        type: 'bar',
        stack: '总量',
        barMaxWidth: 24,
        barGap: '10%',
        itemStyle: {
          show: true,
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(39, 252, 254, 1)',
              },
              {
                offset: 1,
                color: 'rgba(39, 252, 254, 1)',
              },
            ],
            false,
          ),
          borderRadius: 0,
        },
        data: numB,
      },
      {
        // 分隔
        type: 'pictorialBar',
        tooltip: {
          show: false,
        },
        symbolRotate: '-45',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: 'rgba(6, 124, 226, 0.31)',
            },
            {
              offset: 1,
              color: 'rgba(255, 255, 255, 0.31)',
            },
          ]),
        },
        symbolRepeat: 'fixed',
        symbolMargin: -8,
        symbol: 'rect',
        symbolClip: true,
        symbolSize: [2, 28],
        symbolPosition: 'start',
        symbolOffset: [-1, 10],
        data: numA,
        z: 66,
        animationEasing: 'elasticOut',
      },
    ],
  };
  return option;
}
