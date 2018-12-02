// var SceneTitle = function(game) {
//     var s = {
//         game: game,
//     }
//     game.registerAction('k', function() {
//         var s = Scene(game)
//         game.replaceScene(s)
//     })
//     s.draw = function() {
//         game.context.fillText('press k to start', 100, 250)
//     }
//     s.update = function() {

//     }
//     return s
// }
class SceneTitle extends XiaScene{
    constructor(game) {
        super(game)
        this.game = game
        game.registerAction('k', function() {
            var s = Scene(game)
            game.replaceScene(s)
        })
    }
    draw() {
        this.game.context.fillText('press k to start', 100, 250)
    }
    update() {

    }
}