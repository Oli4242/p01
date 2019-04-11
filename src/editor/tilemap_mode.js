class TilemapMode {
  constructor(game, map, mapLayer, player) {
    this.game     = game
    this.map      = map
    this.mapLayer = mapLayer
    this.player   = player

    this.cursor = this.game.add.sprite(0, 0, 'sprites', 0)
    this.cursor.alpha = 0.3
    this.game.add.tween(this.cursor).to({ alpha: 0.8 }, 500, 'Linear', true, 0, -1, true)

    this.currentTile = 0
    this.game.input.mouse.mouseWheelCallback = () => this.mouseWheelCallback()

    this.text = this.game.add.text(0, 0, 'Editor / Tilemap Mode', { font: 'bold 16px Arial', fill: '#fff' })
  }

  update() {
    const x = Math.floor(this.game.input.mousePointer.x / this.map.tileWidth)
    const y = Math.floor(this.game.input.mousePointer.y / this.map.tileHeight)

    this.cursor.x = x * this.map.tileWidth
    this.cursor.y = y * this.map.tileHeight

    if (this.game.input.mousePointer.isDown) {
      const leftClick   = this.game.input.mousePointer.leftButton.isDown
      const rightClick  = this.game.input.mousePointer.rightButton.isDown
      const middleClick = this.game.input.mousePointer.middleButton.isDown

      if (leftClick && this.currentTile === 3)
        this.putPlayer(x, y)
      else if (leftClick)
        this.putTile(x, y)
      else if (rightClick)
        this.removeTile(x, y)
      else if (middleClick)
        this.pickTile(x, y)
    }
  }

  exit() {
    this.text.destroy()
    this.cursor.destroy()
    this.game.input.mouse.mouseWheelCallback = null
  }

  mouseWheelCallback() {
    const min = 0
    const max = 3

    this.currentTile += this.game.input.mouse.wheelDelta

    if (this.currentTile > max)
      this.currentTile = min
    else if(this.currentTile < min)
      this.currentTile = max

    this.cursor.frame = this.currentTile
  }

  putTile(x, y) { this.map.putTile(this.currentTile, x, y, this.mapLayer) }

  removeTile(x, y) { this.map.putTile(-1, x, y, this.mapLayer) }

  pickTile(x, y) {
    const pickedTile = this.map.getTile(x, y, this.mapLayer, true).index
    if (pickedTile !== -1) {
      this.currentTile  = pickedTile
      this.cursor.frame = pickedTile
    }
  }

  putPlayer(x, y) {
    this.player.x = x * this.map.tileWidth
    this.player.y = y * this.map.tileHeight

    this.player.body.velocity.setTo(0)
  }
}

export default TilemapMode
