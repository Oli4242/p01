const Platformer = {

  // defaults settings
  options: {
    gravity: 600,
    velocity: 200,
    jumpStrength: 250,
    controls: {
      left:  [Phaser.KeyCode.LEFT],
      right: [Phaser.KeyCode.RIGHT],
      jump:  [Phaser.KeyCode.UP]
    }
  },

  create(object, options) {
    const gravity  = options.gravity
    const controls = options.controls

    if (gravity > 0)
      object.body.gravity.y = gravity

    options._control_keys = {
      left:  this._addKeys(object.game, controls.left),
      right: this._addKeys(object.game, controls.right),
      jump:  this._addKeys(object.game, controls.jump)
    }
  },

  preUpdate(object, options) {
    const controlKeys = options._control_keys
    const velocity    = options.velocity

    if (this._isDown(controlKeys.left))
      object.body.velocity.x = -velocity
    else if (this._isDown(controlKeys.right))
      object.body.velocity.x = velocity
    else
      object.body.velocity.x = 0

    if (this._isDown(controlKeys.jump) && (object.body.touching.down || object.body.blocked.down))
      object.body.velocity.y = -options.jumpStrength
  },

  _addKeys(game, keyCodes) {
    if (!Array.isArray(keyCodes))
      keyCodes = [keyCodes]
    return keyCodes.map(keyCode => game.input.keyboard.addKey(keyCode))
  },

  _isDown(keys) {
    for (let key of keys) {
      if (key.isDown)
        return true
    }
    return false
  }
}

export default Platformer
