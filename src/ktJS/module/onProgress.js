import { CACHE } from '../CACHE.js'
import TU from '../threeUtils.js'
export default function onProgress(model, container) {
  // if (model.name === '1') {

  //   model.traverse((child) => {
  //     if (child.isMesh) {
  //       child.material.transparent = true
  //       child.material.opacity = 0.3 // 半透明
  //     }
  //   })
  // }
  model.traverse((item) => {
    if (model.name === '1') {
      CACHE.xiangDao = model
      TU.onFadeModel(CACHE.xiangDao)
    }
  })
  model.traverse((item) => {
    if (item.isMesh) {
      CACHE._myMeshArr.push(item)
    }
  })
}
