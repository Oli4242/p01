const PauseHandler = {
  options: {
    behaviors:    [],
    paused:       [],
    pausePhysics: true,
    // tweens?
    // timers?
  },

  create(object, options) {
    this.object   = object
    this.options  = options
    this.isPaused = false
  },

  pause() {
    if (this.isPaused) return

    this.isPaused = true
    const object  = this.object
    const options = this.options

    for (let id of options.behaviors) {
      const behavior = object.behaviors.get(id)
      object.behaviors.remove(id)
      options.paused.push({ id, behavior })
    }

    if (options.pausePhysics && !object.game.physics.arcade.isPaused)
      object.game.physics.arcade.isPaused = true
  },

  unpause() {
    if (!this.isPaused) return

    this.isPaused = false
    const object  = this.object
    const options = this.options

    for (let behavior of options.paused)
      object.behaviors.set(behavior.id, behavior.behavior)

    options.paused = []

    if (options.pausePhysics && object.game.physics.arcade.isPaused)
      object.game.physics.arcade.isPaused = false
  },

  toggle() { this.isPaused ? this.unpause() : this.pause() }
}

export default PauseHandler
