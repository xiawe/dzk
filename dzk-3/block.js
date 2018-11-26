var Block = function(position,game) {
    var p = position
    var o = game.imgByName('paddle')
    // var image = imgFromPath('block.png')
    o.w = 50
    o.h = 20
    o.x = p[0]
    o.y = p[1]
    o.alive = true
    o.lifes = p[2] || 1
    // var o = {
    //     image: image,
    //     w: 50,
    //     h: 20,
    //     x: p[0],
    //     y: p[1],
    //     alive: true,
    //     lifes: p[2] || 1,
    // }
    o.collide = function(b) {
        return o.alive && (isIntersect(b, o) || isIntersect(o, b))
    }
    o.kill = function() {
        log('lifes', o.lifes)
        o.lifes--
        if (o.lifes < 1) {
            o.alive = false
        }
    }
    return o
}