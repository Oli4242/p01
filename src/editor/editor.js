import TilemapMode from './tilemap_mode'
import ObjectMode from './object_mode'

class Editor {
  constructor(game, map, mapLayer, player, objects) {
    this.game     = game
    this.map      = map
    this.mapLayer = mapLayer
    this.player   = player
    this.objects  = objects

    this.mode = new TilemapMode(game, map, mapLayer, player)

    this.changeMode = this.game.input.keyboard.addKey(Phaser.KeyCode.TAB)
    this.changeMode.onDown.add(() => this.toggleMode())
  }

  update() {
    this.mode.update()
  }

  close() {
    this.changeMode.reset()
    this.mode.exit()
  }

  toggleMode() {
    this.mode.exit()
    if (this.mode.constructor == TilemapMode)
      this.mode = new ObjectMode(this.game, this.map, this.player, this.objects)
    else
      this.mode = new TilemapMode(this.game, this.map, this.mapLayer, this.player)
  }
}

export default Editor
