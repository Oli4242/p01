import Platformer from '../behaviors/platformer'
import Dasher from '../behaviors/dasher'
import PauseHandler from '../behaviors/pause_handler'

function addPlayer(game, x, y) {
  const player = game.add.sprite(x, y, 'sprites', 3)

  game.physics.arcade.enable(player)
  game.plugins.behavior.enable(player)

  player.behaviors.set('controls', Platformer, {
    // velocity: 300,
    // jumpStrength: 450,
    // gravity: 1300,
    controls: {
      left:  [Phaser.KeyCode.Q, Phaser.KeyCode.LEFT, Phaser.KeyCode.J, Phaser.KeyCode.A],
      right: [Phaser.KeyCode.D, Phaser.KeyCode.RIGHT, Phaser.KeyCode.L],
      jump:  [Phaser.KeyCode.Z, Phaser.KeyCode.UP, Phaser.KeyCode.I, Phaser.KeyCode.SPACEBAR, Phaser.KeyCode.W]
    }
  })

  player.behaviors.set('dash', Dasher, {
    // velocity: 300,
    // distance: 450,
    // or
    // dashStrength: 450,
    controls: {
      left:  [Phaser.KeyCode.Q, Phaser.KeyCode.LEFT, Phaser.KeyCode.J, Phaser.KeyCode.A],
      up:    [Phaser.KeyCode.Z, Phaser.KeyCode.UP, Phaser.KeyCode.I, Phaser.KeyCode.W],
      right: [Phaser.KeyCode.D, Phaser.KeyCode.RIGHT, Phaser.KeyCode.L],
      down:  [Phaser.KeyCode.S, Phaser.KeyCode.DOWN, Phaser.KeyCode.K]
    }
  })

  const pauseHandler = player.behaviors.set('pause', PauseHandler, {
    behaviors: ['controls']
  })

  // test
  game.input.keyboard.addKey(Phaser.KeyCode.ESC).onDown.add(() => pauseHandler.toggle())

  return player
}

export default addPlayer
