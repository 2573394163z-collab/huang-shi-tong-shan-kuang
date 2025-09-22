import { data } from './num'

function dian(data) {
  const texture = new Bol3D.TextureLoader().load('public/assets/3d/editor/基站.png')
  const material = new Bol3D.SpriteMaterial({
    map: texture,
    transparent: true,
  })
  const sprite = new Bol3D.Sprite(material)

  sprite.position.set(data[0], data[1], data[2])
  sprite.scale.set(25, 50, 1)

  return sprite
}

function handlePos(data) {
  data.location = [data.position.x, 0, data.position.y]
  return data
}

function maoDian() {
  for (let i = 0; i < data.length; i++) {
    handlePos(data[i])
    const sprite = dian(data[i].location)
    CACHE.group.add(sprite) // 把 sprite 加到 group
  }
  //  整体旋转 90°
  CACHE.group.rotation.y = Math.PI / 2
}

export { dian, maoDian }
