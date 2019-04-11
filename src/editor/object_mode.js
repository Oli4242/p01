import addCollectable from '../factories/collectable'

class ObjectMode {
  constructor(game, map, player, objects) {
    this.game    = game
    this.map     = map
    this.player  = player
    this.objects = objects

    this.cursor = this.game.add.sprite(0, 0, 'sprites', 3)
    this.cursor.anchor.set(0.5)
    this.cursor.alpha = 0.3
    this.game.add.tween(this.cursor).to({ alpha: 0.8 }, 500, 'Linear', true, 0, -1, true)

    this.snapToGrid = false
    this.snapMode = this.game.input.keyboard.addKey(Phaser.KeyCode.S)
    this.snapMode.onDown.add(() => this.toggleSnapMode())

    this.text = this.game.add.text(0, 0, 'Editor / Object Mode', { font: 'bold 16px Arial', fill: '#fff' })

    this.currentTool = 0
    this.game.input.mouse.mouseWheelCallback = () => this.mouseWheelCallback()
    this.tools = [
      { key: 'sprites', frame: 3, scale: 0.5, factory: addCollectable },
      { key: 'sprites', frame: 3, scale: 1.0, factory: null }
    ]

    this.updateCursor()
  }

  update() {
    const x = this.getCursorX()
    const y = this.getCursorY()

    this.cursor.x = x
    this.cursor.y = y

    if (this.game.input.mousePointer.isDown) {
      const leftClick    = this.game.input.mousePointer.leftButton.isDown
      const rightClick   = this.game.input.mousePointer.rightButton.isDown
      const activeObject = this.game.physics.arcade.getObjectsAtLocation(x, y, this.objects)[0]

      if (leftClick && this.currentTool === 1)
        this.putPlayer(x, y)
      else if (leftClick && !activeObject)
        this.putObject(x, y)
      else if (rightClick && activeObject)
        activeObject.destroy()
    }
  }

  exit() {
    this.text.destroy()
    this.cursor.destroy()
  }

  toggleSnapMode() {
    this.snapToGrid = !this.snapToGrid
  }

  mouseWheelCallback() {
    const min = 0
    const max = 1

    this.currentTool += this.game.input.mouse.wheelDelta

    if (this.currentTool > max)
      this.currentTool = min
    else if(this.currentTool < min)
      this.currentTool = max

    this.updateCursor()
  }

  updateCursor() {
    const tool = this.tools[this.currentTool]

    this.cursor.key = tool.key
    this.cursor.frame = tool.frame
    this.cursor.scale.set(tool.scale)
  }

  getCursorX() {
    if (this.snapToGrid)
      return this.snap(this.game.input.mousePointer.x, this.map.tileWidth, 16) // TODO: remove magic number
    return this.game.input.mousePointer.x
  }

  getCursorY() {
    if (this.snapToGrid)
      return this.snap(this.game.input.mousePointer.y, this.map.tileHeight, 16) // TODO: remove magic number
    return this.game.input.mousePointer.y
  }

  snap(value, step, offset) { return Math.floor(value / step) * step + offset }

  putObject(x, y) {
    const factory = this.tools[this.currentTool].factory
    const object  = factory(this.game, x, y)

    // When the physics engine is paused the body isn't correctly initialized.
    // We need to manually take in account the offset caused by the anchor:
    object.body.x = object.body.x - object.anchor.x * object.body.width
    object.body.y = object.body.y - object.anchor.y * object.body.height

    this.objects.push(object)
  }

  putPlayer(x, y) {
    this.player.centerX = x
    this.player.centerY = y

    this.player.body.velocity.setTo(0)
  }
}

export default ObjectMode
