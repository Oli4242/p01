import addPlayer from '../factories/player'
import addCollectable from '../factories/collectable'
import Editor from '../editor/editor'

class Start {
  constructor(game) {
    this.game = game
  }

  create() {
    this.map = this.game.add.tilemap()
    this.map.addTilesetImage('tiles', 'sprites', 32, 32, 1, 1)
    this.mapLayer = this.map.create('level', 20, 15, 32, 32)
    this.map.setCollision([0, 1, 2], true, this.mapLayer)
    this.collectables = []

    for (let i = 1; i < 19; i++) {
      this.map.putTile(0, i, 14, this.mapLayer)
      this.collectables.push(addCollectable(this.game, i * 32 + 16, 14 * 32 - 16))
    }

    this.player = addPlayer(this.game, 100, 100)

    this.isPaused = false
    this.pauseKey = this.game.input.keyboard.addKey(Phaser.KeyCode.ESC).onDown.add(() => this.togglePause())
  }

  update() {
    if (this.isPaused)
      return this.editor.update()

    this.game.physics.arcade.collide(this.player, this.mapLayer)
    this.game.physics.arcade.overlap(this.player, this.collectables)
  }

  togglePause() {
    this.isPaused = !this.isPaused
    if (this.isPaused)
      this.editor = new Editor(this.game, this.map, this.mapLayer, this.player, this.collectables)
    else
      this.editor.close()
  }
}

export default Start
