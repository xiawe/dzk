// var SceneEnd = function(game) {
//     var s = {
//         game: game,
//     }
//     game.registerAction('r', function() {
//         var s = SceneTitle(game)
//         game.replaceScene(s)
//     })
//     s.draw = function() {
//         game.context.fillText('按 r 重玩', 100, 250)
//     }
//     s.update = function() {

//     }
//     return s
// }

class SceneEnd extends SceneTitle{
    constructor(game) {
        super(game)
        this.game = game
        game.registerAction('r', function() {
            // var s = new SceneTitle(game)
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        this.game.context.fillText('按 r 重玩', 100, 250)
    }
    update() {

    }
}