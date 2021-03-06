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
    // 拖动球
    var bMousedown = false
    window.addEventListener('mousedown', function(event) {
        log('mousedown', event)
        bMousedown = true
    })

    window.addEventListener('mouseup', function() {
        log('mouseup', event)
        bMousedown = false
    })

    document.querySelector('#id-canvas').addEventListener('mousemove', function(event) {
        if (bMousedown) {
            log('mousemove', event)
            ball.x = event.clientX
            ball.y = event.clientY
        }
    })
}

var __main = function() {
    var images = {
        paddle: 'paddle.png',
        ball: 'ball.png',
        block: 'block.png',
    }
    
    var game = Game(30, images, function() {
        log('game o', game)

        var paddle = Paddle(game)
        var ball = Ball(game)
        blocks = loadLevel(2, game)
        // log('blocks', blocks)

        enableDebugMode(true, game, ball)

        var score = 0
        game.registerAction('a', function() {
            paddle.moveLeft()
        })
        game.registerAction('d', function() {
            paddle.moveRight()
        })
        game.registerAction('f', function() {
            ball.fire()
        })
        game.update = function() {
            if (window.paused) {
                return
            }
            ball.move()
            if (paddle.collide(ball)) {
                ball.bounce()
            }
            for (var i = 0; i < blocks.length; i++) {
                var b = blocks[i]
                if (b.collide(ball)) {
                    ball.bounce()
                    b.kill()
                    score += 100
                }
            }
        }
        game.draw = function() {
            game.drawImg(paddle)
            game.drawImg(ball)
            // game.drawImg(block)
            for (var i = 0; i < blocks.length; i++) {
                if (blocks[i].alive) {
                    game.drawImg(blocks[i])              
                }
            }
            game.context.fillText('分数：' + score, 10, 380)
        }
    })

}
__main()