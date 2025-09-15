interface DataType {
  name: string; // 数据名称
  value: number; // 数据值
  percent?: number; // 数据占比
  angle?: number; // 弧度制角度，用于计算起始结束角度
  startAngle?: number; // 起始角度
  endAngle?: number; // 结束角度
  itemStyle?: object; // 饼图样式
}
interface ColorList {
  r: number; // 红色
  g: number; // 绿色
  b: number; // 蓝色
}
interface CoordinatesData {
  x: number;
  x2: number;
  y: number;
  y2: number;
}
/**
 * 线性渐变起止方向的计算方法
 * @param {*} startArc 开始角度
 * @param {*} endArc 结束角度
 * @returns 四个坐标 x,y,x2,y2
 */
function getCoordinates(startArc: number, endArc: number): CoordinatesData {
  // 这里计算扇形最外层的x,y坐标
  const position = [
    Math.sin(startArc),
    -Math.cos(startArc),
    Math.sin(endArc),
    -Math.cos(endArc),
  ];
  // 这里求得了最外层两个顶点坐标的差值。
  const dx = position[2] - position[0];
  const dy = position[3] - position[1];

  // 这里在根据两点坐标的差值计算x,y,x2,y2
  return getLocation(dx, dy);
}

function getLocation(dx: number, dy: number): CoordinatesData {
  const tanV = dx / dy;
  // 这里是在计算按照横向渐变还是按照纵向渐变。
  const directSign = Math.abs(tanV) < 1;
  const t = directSign ? tanV : 1 / tanV;

  const sign1 = t > 0 ? 1 : -1;
  const sign2 = dx > 0 ? 1 : -1;
  const sign = directSign ? sign1 * sign2 : sign2;

  // 把整个圆形的坐标映射到了[0-1]之间0.5，0.5即为圆心坐标。
  const group1 = [0.5 - (sign * t) / 2, 0.5 + (sign * t) / 2];
  // 这里给纵向渐变还是横向渐变赋值、即group中的第三项和第四项的值
  const group2 = sign > 0 ? [0, 1] : [1, 0];
  const group = [...group1, ...group2];
  const keys = directSign ? ['x', 'x2', 'y', 'y2'] : ['y', 'y2', 'x', 'x2'];

  const res = {} as CoordinatesData | null;
  keys.forEach((k, idx) => {
    res[k] = group[idx];
  });
  return res;
}

/**
 * 给数据写入 样式(线性渐变)
 *
 * @param {*} data 数据
 * @param {*} colorlist 颜色列表
 * @param {*} startOpacity 开始颜色的透明度
 * @param {*} endOpacity 结束颜色透的明度
 * @returns 带样式的数据
 */
export function setGradientColorInItemStyle(
  data: DataType[],
  colorlist: ColorList[],
  startOpacity: number = 1,
  endOpacity: number = 0,
): DataType[] {
  // 计算每部分比例，以及开始角度，结束角度
  const dataTotal = data.reduce((prev, curr) => prev + curr.value, 0);

  data.forEach((item, idx) => {
    item.percent = item.value / dataTotal;
    item.angle = item.percent * Math.PI * 2; // 弧度制的角度
    if (idx === 0) {
      item.startAngle = 0;
      item.endAngle = item.angle;
    }
    else {
      item.startAngle = data[idx - 1].startAngle + data[idx - 1].angle;
      item.endAngle = item.startAngle + item.angle;
    }
  });

  // 给数据添加样式
  for (let i = 0; i < data.length; i++) {
    const color = colorlist[i];
    const startAngle = data[i].startAngle;
    const endAngle = data[i].endAngle;
    // 这里计算了 线性渐变的起止方向
    const coordinates = getCoordinates(startAngle, endAngle);

    // 添加渐变样式
    data[i].itemStyle = {
      color: {
        ...coordinates,
        type: 'linear',
        global: false,
        colorStops: [
          {
            offset: 0,
            color: `rgba(${color.r}, ${color.g}, ${color.b}, ${startOpacity})`,
          },
          {
            offset: 0.91,
            color: `rgba(${color.r}, ${color.g}, ${color.b}, ${endOpacity})`,
          },
        ],
      },
    };
  }
  return data;
}
