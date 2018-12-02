var loadLevel = function(k, game) {
    var p = position[k]
    // log('p', p)
    var blocks = []
    for (var i = 0; i < p.length; i++) {
        var block = Block(p[i], game) 
        // log(i, block)
        blocks.push(block)           
    }
    return blocks
}

var blocks = []
var enableDebugMode = function(enable, game, ball) {
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
    // 调整帧率（速度）
    document.querySelector('.slide-control').addEventListener('input', function(event) {
        var input = event.target
        // log('slide input', event, input, input.value)
        window.fps = Number(input.value)
    })
}

var __main = function() {
    var images = {
        paddle: 'img/paddle.png',
        ball: 'img/ball.png',
        block: 'img/block.png',
    }

    var game = Game.instance(30, images, function(g) {
        var s = new SceneTitle(g)
        // log('g', g)
        g.runWithScene(s)
        // log('callback scene', g)
    })

    enableDebugMode(true, game)
}
__main()