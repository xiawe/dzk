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
        log('fps', window.fps)
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
        }, 1000 / fps)
    }
    // 载入所有图片后，再执行
    var names = Object.keys(images)
    var loads = []
    for (var i = 0; i < names.length; i++) {
        if (images[name]) {
            loads.push(1)
        }

    }
    g.run = function() {
        setTimeout(function() {
            runLoop()
        }, 1000 / fps)
    }
    return g
}
    console.log('very outside', b)
    for (var i = 0; i < 5; i++) {
        var b = i
        console.log('outside', b)     
        setTimeout(function() {
            console.log('inside',b)
        }, 2000)   
    }