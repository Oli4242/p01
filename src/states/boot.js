class Boot {
  constructor(game) {
    this.game = game
  }

  preload() {
    this.game.load.spritesheet('sprites', 'assets/sprites.png', 32, 32, -1, 1, 1)
  }

  create() {
    this.loadPlugins()
    this.game.canvas.oncontextmenu = e => e.preventDefault()
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.state.start('start')
  }

  // TODO: something cleaner like a Game class that would handle that
  loadPlugins() {
    const plugins = this.game.plugins

    if (Phaser.Plugin.Behavior)
      plugins.behavior = plugins.add(Phaser.Plugin.Behavior)

    if (Phaser.Plugin.Inspector)
      plugins.inspector = plugins.add(Phaser.Plugin.Inspector)
  }
}

export default Boot
