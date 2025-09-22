import { CACHE } from '../CACHE'
import { data } from './num'
function dian(data) {
  const geo = new Bol3D.SphereGeometry(2, 10, 10)
  const mat = new Bol3D.MeshPhongMaterial({ color: 0x00ff0f })
  const mesh = new Bol3D.Mesh(geo, mat)
  mesh.position.set(data[0], data[1], data[2])
  return mesh
}

// function dian(data) {
//   const texture = new Bol3D.TextureLoader().load('public/assets/3d/editor/基站.png') // 基站图片路径
//   const material = new Bol3D.SpriteMaterial({
//     map: texture,
//     transparent: true, // 保证透明部分不显示
//   })
//   const sprite = new Bol3D.Sprite(material)

//   // 设置位置
//   sprite.position.set(data[0], data[1], data[2])

//   // 设置缩放，控制大小
//   sprite.scale.set(50, 100, 1)
//   sprite.rotation.z = Math.PI / 2
//   CACHE.container.scene.add(sprite)
// }

// function dian(data) {
//   const texture = new Bol3D.TextureLoader().load('public/assets/3d/editor/基站.png')
//   const material = new Bol3D.SpriteMaterial({
//     map: texture,
//     transparent: true,
//   })
//   const sprite = new Bol3D.Sprite(material)

//   sprite.position.set(data[0], data[1], data[2])
//   sprite.scale.set(25, 50, 1)

//   return sprite
// }

function createLabel(text) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 256
  canvas.height = 64

  // 绘制文字
  ctx.fillStyle = 'rgba(255,255,255,1)'
  ctx.font = '32px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)

  // 用 canvas 作为纹理
  const texture = new Bol3D.CanvasTexture(canvas)
  const material = new Bol3D.SpriteMaterial({ map: texture, transparent: true, alphaTest: 0.01, depthWrite: false })
  const sprite = new Bol3D.Sprite(material)

  sprite.scale.set(50, 12, 1) // 宽度、高度
  return sprite
}

function handlePos(data) {
  data.location = [data.position.x, 0, data.position.y]
  return data
}

function maoDian() {
  for (let i = 0; i < data.length; i++) {
    handlePos(data[i])

    // 小球
    const mesh = dian(data[i].location)
    mesh.name = data[i].name // 给 mesh 设置逻辑名称

    // 文字标签
    const label = createLabel(data[i].name)
    label.position.set(
      data[i].location[0],
      data[i].location[1] + 10, // 在小球上方一点
      data[i].location[2]
    )

    CACHE.group.add(mesh)
    CACHE.group.add(label)
  }

  // 整体旋转 90°
  CACHE.group.rotation.y = Math.PI / 2
  CACHE.group.scale.set(1.2, 1.2, 1.2)
}

export { dian, maoDian }
