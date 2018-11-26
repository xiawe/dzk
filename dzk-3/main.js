var loadLevel = function(k) {
    var p = position[k]
    // log('p', p)
    var blocks = []
    for (var i = 0; i < p.length; i++) {
        var block = Block(p[i]) 
        log(i, block)
        blocks.push(block)           
    }
    return blocks
}

var blocks = []
var enableDebugMode = function(enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event) {
        var k = event.key
        if (k == 'p') {
            window.paused = !window.paused
        } else if ('01234567'.includes(Number(k))) {
            blocks = loadLevel(Number(k))
        }
    })
    var input = document.querySelector('.slide-control')
    window.fps = 30
    window.addEventListener('input', function() {
        // log('input', input.value)
        window.fps = input.value
    })
}

var __main = function() {
    var images = {
        paddle: 'paddle.png',
        ball: 'ball.png',
        block: 'block.png',
    }
    enableDebugMode(true)
    
    var game = Game(30,images)
    log('game o', game)

    var paddle = Paddle(game)
    var ball = Ball(game)
    
    blocks = loadLevel(2)
    // log('blocks', blocks)
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
}
__main()