import Collectable from '../behaviors/collectable'

function addCollectable(game, x, y) {
  const collectable = game.add.sprite(x, y, 'sprites', 3)

  collectable.scale.set(0.5)
  collectable.anchor.set(0.5)

  game.physics.arcade.enable(collectable)
  game.plugins.behavior.enable(collectable)

  collectable.behaviors.set('collectable', Collectable, {
    onCollection: () => collectable.destroy()
  })

  return collectable
}

export default addCollectable
