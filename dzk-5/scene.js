var Scene = function(game) {
    var s = {}
    var paddle = Paddle(game)
    var ball = Ball(game)
    
    blocks = loadLevel(2, game)
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
    s.update = function() {
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
    s.draw = function() {
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
    return s
}