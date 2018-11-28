var Game = function(fps, images, runCallback) {
    var g = {
        actions: {},
        keydowns: {},
        imgs: {},
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
        }, 1000 / window.fps)
    }
    // 载入所有图片后，再执行
    var names = Object.keys(images)
    // log('names', names)
    var loads = []
    for (var i = 0; i < names.length; i++) {
        let name = names[i]
        // log('name', i, name)
        var path = images[name]
        let img = new Image()
        img.src = path 
        img.onload = function() {
            // log('inner name', i, name)
            g.imgs[name] = img
            // imgs.push(img)
            loads.push(1)
            // log('g.imgs.length', g.imgs, names.length)
            if (loads.length == names.length) {
                g.run()
                log('or g.imgs', g.imgs)
            }
        }
    }

    g.imgByName = function(name) {
        log('g.imgs', g.imgs)
        var img = g.imgs[name]
        var image = {
            image: img,
            w: img.width,
            h: img.height,
        }
        return image
    }

    g.run = function() {
        runCallback()
        runLoop()
        // setTimeout(function() {
        //     log('diaoyong')
        //     runLoop()
        // }, 1000 / fps)
    }
    return g
}