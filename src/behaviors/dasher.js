const Dasher = {

  // defaults settings
  options: {
    // velocity: 300,
    // distance: 450,
    // or
    // dashStrength: 450,
    controls: {
      left:  [Phaser.KeyCode.LEFT],
      up:    [Phaser.KeyCode.UP],
      right: [Phaser.KeyCode.RIGHT],
      down:  [Phaser.KeyCode.DOWN]
    }
  },

  create(object, options) {
    const controls = options.controls

    options._control_keys = {
      left:  this._addKeys(object.game, controls.left),
      up:    this._addKeys(object.game, controls.up),
      right: this._addKeys(object.game, controls.right),
      down:  this._addKeys(object.game, controls.down)
    }

    options._lastKey = null
    options._lastKeyTime = 0
  },

  preUpdate(object, options) {
    // const controlKeys = options._control_keys
    // const velocity    = options.velocity
    //
    // if (this._isDown(controlKeys.left))
    //   object.body.velocity.x = -velocity
    // else if (this._isDown(controlKeys.right))
    //   object.body.velocity.x = velocity
    // else
    //   object.body.velocity.x = 0
    //
    // if (this._isDown(controlKeys.jump) && (object.body.touching.down || object.body.blocked.down))
    //   object.body.velocity.y = -options.jumpStrength
  },

  _addKeys(game, keyCodes) {
    if (!Array.isArray(keyCodes))
      keyCodes = [keyCodes]
    return keyCodes.map(keyCode => {
      const key = game.input.keyboard.addKey(keyCode)
      key.onDown.add((key) => this._handleKeyDown(key))
      return key
    })
  },

  _isDown(keys) {
    for (let key of keys) {
      if (key.isDown)
        return true
    }
    return false
  },

  _handleKeyDown(key) {
    const keyCode  = key.keyCode
    const timeDown = key.timeDown

    if (this._lastKey === keyCode && timeDown - this._lastKeyTime < 150)
      console.log('DASH' + timeDown)

    this._lastKey = keyCode
    this._lastKeyTime = timeDown
  }
}

export default Dasher
