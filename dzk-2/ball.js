var Ball = function() {
    var image = imgFromPath('ball.png')
    var o = {
        image: image,
        x: 350,
        y: 100,
        speedX: 4,
        speedY: 4,
        fired: false,
    }
    o.fire = function() {
        o.fired = true
    }
    
    // o.collide = function(thing) {
    //     if (o.x < thing.x && o.y < thing.y) {
    //         if (thing.x - o.x < o.image.width && thing.y - o.y < o.image.height) {
    //             log('球撞左上角', thing)
    //             return true
    //         }
    //     }
    //     if (o.x > thing.x && o.y < thing.y) {
    //         if (o.x - thing.x < thing.image.width && thing.y - o.y < o.image.height) {
    //             log('球撞右上角', thing)
    //             return true
    //         }
    //     }
    //     if (o.x < thing.x && o.y > thing.y) {
    //         if (thing.x - o.x < o.image.width && o.y - thing.y < thing.image.height) {
    //             log('球撞左下角', thing)
    //             return true
    //         }
    //     }
    //     if (o.x > thing.x && o.y > thing.y) {
    //         if (o.x - thing.x < thing.image.width && o.y - thing.y < thing.image.height) {
    //             log('球撞右下角', thing)
    //             return true
    //         }
    //     }
    //     return false
    // }
    o.bounce = function() {
        o.speedY = -o.speedY
    }
    o.move = function() {
        if (o.fired) {
            if (o.x >= 500 || o.x <= 0) {
                o.speedX = -o.speedX
            }
            if (o.y >= 400 || o.y <= 0) {
                o.speedY = -o.speedY
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    return o
}