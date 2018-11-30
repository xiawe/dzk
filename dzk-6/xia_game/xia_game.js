class Game{
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.imgs = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')

        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', event => {
            this.keydowns[event.key] = false
        })
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    drawImg(gameImage) {
        g.context.drawImage(gameImage.image, gameImage.x, gameImage.y)
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
        // log('fps', window.fps)
        var g = this
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
        context.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
        setTimeout(function() {
            runLoop()
        }, 1000 / window.fps)
    }

    imgByName(name) {
        // log('g.imgs', g.imgs)
        var g = this
        var img = g.imgs[name]
        this.image = {
            image: img,
            w: img.width,
            h: img.height,
        }
        return image
    }

    runWithScene(scene) {
        // log('runWithScene')
        this.scene = scene
        this.runLoop()
        log('runWithScene runLoop')
    }

    replaceScene(scene) {
        this.scene = scene
    }

    init() {
        var g = this
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
                    runCallback(g)
                    log('or g.imgs', g.imgs)
                }
            }
        }
    }
}