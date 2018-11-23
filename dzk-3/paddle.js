var Paddle = function() {
    var image = imgFromPath('paddle.png')
    var o = {
        image: image,
        x: 200,
        y: 300,
        speed: 13,
    }
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