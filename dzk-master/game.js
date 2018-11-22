var Game = function() {
    var g = {
        actions: {},
        keydowns: {},
    }
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    g.drawImg = function(gameImage) {
        g.context.drawImage(gameImage.image, gameImage.x, gameImage.y)
    }
    window.addEventListener('keydown', function(event) {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function(event) {
        g.keydowns[event.key] = false
    })
    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }
    var runLoop = function() {
        // log('fps', window.fps)
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                g.actions[key]()
            }            
        }
        g.update()
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
        setTimeout(function() {
            runLoop()
        }, 1000 / 30)
    }
    setTimeout(function() {
        runLoop()
    }, 1000 / fps)
    // setInterval(function() {
    //     log('fps', window.fps)
    //     var actions = Object.keys(g.actions)
    //     for (var i = 0; i < actions.length; i++) {
    //         var key = actions[i]
    //         if (g.keydowns[key]) {
    //             g.actions[key]()
    //         }            
    //     }
    //     g.update()
    //     // clear
    //     context.clearRect(0, 0, canvas.width, canvas.height)
    //     // draw
    //     g.draw()
    // }, 1000 / window.fps)
    return g
}