var Paddle = function(game) {
    var o = game.imgByName('paddle')
    // log('paddle name', o)
    o.x = 200
    o.y = 300
    o.speed = 13
    // var o = {
    //     image: image,
    //     x: 200,
    //     y: 300,
    //     speed: 13,
    // }
    o.moveLeft = function() {
        o.x -= o.speed
    }
    o.moveRight = function() {
        o.x += o.speed
    }
    o.collide = function(a) {
        return isIntersect(a, o)
    }
    return o
}