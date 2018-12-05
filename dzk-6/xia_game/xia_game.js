class Game{
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback

        this.keydowns = {}
        this.scene = null
        this.imgs = {}
        this.actions = {}

        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')

        var self = this
        window.addEventListener('keydown', function(event) {
            self.keydowns[event.key] = true
        })
        window.addEventListener('keyup', function(event) {
            self.keydowns[event.key] = false
        })
        this.init() 
    }
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    drawImage(gameImage) {
        this.context.drawImage(gameImage.image, gameImage.x, gameImage.y)
    }
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    update() {
        this.scene.update()
    }
    
    draw() {
        this.scene.draw()
    }
    runLoop() {
        var g = this
        // log('fps', window.fps)
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                g.actions[key]()
            }            
        }
        // log('g.update', g.scene)
        g.update()
        // clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        // draw
        g.draw()
        setTimeout(function() {
            g.runLoop()
        }, 1000 / window.fps)
    }

    imgByName(name) {
        // log('g.imgs', g.imgs)
        var img = this.imgs[name]
        var image = {
            image: img,
            w: img.width,
            h: img.height,
        }
        return image
    }
    runWithScene(scene) {
        this.scene = scene
        this.runLoop()
    }
    replaceScene(scene) {
        this.scene = scene
        // log('replaceScene', scene)
    }
    
    init() {
        var g = this
        // 载入所有图片后，再执行
        var names = Object.keys(g.images)
        // log('names', names)
        var loads = []
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            // log('name', i, name)
            var path = g.images[name]
            let img = new Image()
            img.src = path 
            img.onload = function() {
                // log('inner name', i, name)
                g.imgs[name] = img
                // imgs.push(img)
                loads.push(1)
                // log('g.imgs.length', g.imgs, names.length)
                if (loads.length == names.length) {
                    g.runCallback(g)
                    log('or g.imgs', g.imgs)
                }
            }
        }
    }
}

// var Game = function(fps, images, runCallback) {
//     var g = {
//         scene: null,
//         actions: {},
//         keydowns: {},
//         imgs: {},
//     }
//     var canvas = document.querySelector('#id-canvas')
//     var context = canvas.getContext('2d')
//     g.canvas = canvas
//     g.context = context
//     g.drawImg = function(gameImage) {
//         g.context.drawImage(gameImage.image, gameImage.x, gameImage.y)
//     }
    
//     window.addEventListener('keydown', function(event) {
//         g.keydowns[event.key] = true
//     })
//     window.addEventListener('keyup', function(event) {
//         g.keydowns[event.key] = false
//     })
//     g.registerAction = function(key, callback) {
//         g.actions[key] = callback
//     }
//     g.update = function() {
//         g.scene.update()
//     }
//     g.draw = function() {
//         g.scene.draw()
//     }
//     var runLoop = function() {
//         // log('fps', window.fps)
//         var actions = Object.keys(g.actions)
//         for (var i = 0; i < actions.length; i++) {
//             var key = actions[i]
//             if (g.keydowns[key]) {
//                 g.actions[key]()
//             }            
//         }
//         // log('g.update', g.scene)
//         g.update()
//         // clear
//         context.clearRect(0, 0, canvas.width, canvas.height)
//         // draw
//         g.draw()
//         setTimeout(function() {
//             runLoop()
//         }, 1000 / window.fps)
//     }
//     // 载入所有图片后，再执行
//     var names = Object.keys(images)
//     // log('names', names)
//     var loads = []
//     for (var i = 0; i < names.length; i++) {
//         let name = names[i]
//         // log('name', i, name)
//         var path = images[name]
//         let img = new Image()
//         img.src = path 
//         img.onload = function() {
//             // log('inner name', i, name)
//             g.imgs[name] = img
//             // imgs.push(img)
//             loads.push(1)
//             // log('g.imgs.length', g.imgs, names.length)
//             if (loads.length == names.length) {
//                 runCallback(g)
//                 log('or g.imgs', g.imgs)
//             }
//         }
//     }

//     g.imgByName = function(name) {
//         // log('g.imgs', g.imgs)
//         var img = g.imgs[name]
//         var image = {
//             image: img,
//             w: img.width,
//             h: img.height,
//         }
//         return image
//     }

//     g.runWithScene = function(scene) {
//         // log('runWithScene')
//         g.scene = scene
//         runLoop()
//         log('runWithScene runLoop')
//     }

//     g.replaceScene = function(scene) {
//         g.scene = scene
//     }

//     return g
// }