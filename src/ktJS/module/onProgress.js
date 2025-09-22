import { CACHE } from '../CACHE.js'
export default function onProgress(model, container) {
  if (model.name === '1') {
    CACHE.xiangDao = model
    model.traverse((child) => {
      if (child.isMesh) {
        child.material.transparent = true
        child.material.opacity = 0.5 // 半透明
      }
    })
  }
  model.traverse((item) => {
    if (item.isMesh) {
      CACHE._myMeshArr.push(item)
    }
  })
}
