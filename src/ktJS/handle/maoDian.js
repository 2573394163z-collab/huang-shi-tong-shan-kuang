import { data } from './num'
// function dian(data) {
//   const geo = new Bol3D.SphereGeometry(10, 10, 10)
//   const mat = new Bol3D.MeshPhongMaterial({ color: 0x00ff0f })
//   const mesh = new Bol3D.Mesh(geo, mat)
//   mesh.position.set(data[0], data[1], data[2])
//   CACHE.container.scene.add(mesh)
// }

function dian(data) {
  const texture = new Bol3D.TextureLoader().load('public/assets/3d/editor/基站.png') // 基站图片路径
  const material = new Bol3D.SpriteMaterial({
    map: texture,
    transparent: true, // 保证透明部分不显示
  })
  const sprite = new Bol3D.Sprite(material)

  // 设置位置
  sprite.position.set(data[0], data[1], data[2])

  // 设置缩放，控制大小
  sprite.scale.set(50, 100, 1)

  CACHE.container.scene.add(sprite)
}

function handlePos(data) {
  data.location = [data.position.x, 0, data.position.y]
  return data
}

function maoDian() {
  ////展示原点
  const geo = new Bol3D.SphereGeometry(10, 10, 10)
  const mat = new Bol3D.MeshPhongMaterial({ color: 0xff0000 })
  const mesh = new Bol3D.Mesh(geo, mat)
  mesh.position.set(0, 0, 0)
  CACHE.container.scene.add(mesh)
  for (let i = 0; i < data.length; i++) {
    handlePos(data[i])
    console.log(data[i].location, '1111111111111111111')
    dian(data[i].location)
  }
}
export { dian, maoDian }
