import { CACHE } from '../CACHE.js';
export default function onProgress(model, container) {
  model.traverse((item) => {
    if(item.isMesh){
      CACHE._myMeshArr.push(item);
    }
  });
}
