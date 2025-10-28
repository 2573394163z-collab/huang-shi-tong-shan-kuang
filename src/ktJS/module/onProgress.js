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
      CACHE.xiangDao1 = model
      TU.onFadeModel(CACHE.xiangDao1)
    }
    else if (model.name === '-160') {
      CACHE.xiangDao2 = model
      TU.onFadeModel(CACHE.xiangDao2)
      CACHE.xiangDao2.position.set(-175, 0, -343)
    }
    else if (model.name === '-190') {
      CACHE.xiangDao3 = model
      TU.onFadeModel(CACHE.xiangDao3)
    }
  })
  model.traverse((item) => {
    if (item.isMesh) {
      CACHE._myMeshArr.push(item)
    }
  })
}
