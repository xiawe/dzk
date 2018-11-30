class SceneEnd extends SceneTitle{
    constructor(game) {
        super(game)
        game.registerAction('r', function() {
            var s = Scene(game)
            game.replaceScene(s)
        })
    }
    draw() {
        this.game.context.fillText('Game over! Press r to continue', 100, 250)
    }
}