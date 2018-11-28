var loadLevel = function(k, game) {
    var p = position[k]
    // log('p', p)
    var blocks = []
    for (var i = 0; i < p.length; i++) {
        var block = Block(p[i], game) 
        log(i, block)
        blocks.push(block)           
    }
    return blocks
}

var blocks = []
var enableDebugMode = function(enable, game) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event) {
        var k = event.key
        if (k == 'p') {
            window.paused = !window.paused
        } else if ('01234567'.includes(Number(k))) {
            blocks = loadLevel(Number(k), game)
        }
    })
    window.fps = 30
    document.querySelector('.slide-control').addEventListener('input', function(event) {
        var input = event.target
        // log('slide input', event, input, input.value)
        window.fps = Number(input.value)
    })
}

var __main = function() {
    var images = {
        paddle: 'paddle.png',
        ball: 'ball.png',
        block: 'block.png',
    }
    var scene = Scene(game)
    var game = Game(30, images, function() {
        scene.update()
        scene.draw()
    })

    enableDebugMode(true, game)
}
__main()