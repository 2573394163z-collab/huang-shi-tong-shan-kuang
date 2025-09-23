import { CACHE } from './CACHE.js'
import { STATE } from './STATE.js'

// 深度克隆
function cloneDeep(object, deep = true, cacheMap) {
  if (!cacheMap) cacheMap = new WeakMap()
  if (typeof object === 'object' && object !== null) {
    const newObj = new object.constructor()

    cacheMap.set(object, newObj)
    for (const key of Object.keys(object)) {
      // 防止重复引用导致的死循环
      if (cacheMap.has(object[key])) {
        newObj[key] = cacheMap.get(object[key])
        continue
      }

      newObj[key] = deep ? cloneDeep(object[key], deep, cacheMap) : object[key]
    }

    return newObj
  } else {
    return object
  } // 基本数据类型
}

// ************************************************************* 在此添加你的 API *************************************************************
/**
 * 背景切换
 */
function setBackground(imgName) {
  const options = {
    type: 'panorama',
    panorama: [`/editor/${imgName}`],
  }
  CACHE.container.updateBackground(STATE.PUBLIC_PATH, options)
}

//主场景贴图流动动画
let angle = 0

function animate() {
  angle += 0.0009
  if (CACHE.container && CACHE.container.sky) {
    CACHE.container.sky.rotation.y = angle
  }
  requestAnimationFrame(animate)
}

export const API = {
  setBackground,
  cloneDeep,
  animate,
}
