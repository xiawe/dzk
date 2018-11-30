class SceneTitle extends XiaScene{
    constructor(game) {
        super(game)
        game.registerAction('k', function() {
            var s = Scene(game)
            game.replaceScene(s)
        })
    }
    draw() {
        this.game.context.fillText('Press k to start', 100, 250)
    }
}