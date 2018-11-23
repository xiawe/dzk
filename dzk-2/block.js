var Block = function(position) {
    var p = position
    var image = imgFromPath('block.png')
    var o = {
        image: image,
        w: 50,
        h: 20,
        x: p[0],
        y: p[1],
        alive: true,
        lifes: p[2] || 1,
    }
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