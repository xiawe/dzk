var log = console.log.bind(console)

var imgFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var isIntersect = function(a, b) {
    var o = a
    var thing = b
    if (o.x < thing.x && o.y < thing.y) {
        if (thing.x - o.x < o.image.width && thing.y - o.y < o.image.height) {
            return true
        }
    }
    if (o.x > thing.x && o.y < thing.y) {
        if (o.x - thing.x < thing.image.width && thing.y - o.y < o.image.height) {
            return true
        }
    }
    return false
}