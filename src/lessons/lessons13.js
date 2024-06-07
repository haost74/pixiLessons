import { Application } from '@pixi/app'
import { Sprite } from '@pixi/sprite'
import { Button, Input, ScrollBox } from '@pixi/ui'
import { Container } from '@pixi/display'
import { Graphics } from '@pixi/graphics'
import { Texture, BaseTexture, Rectangle } from '@pixi/core'
import { EventSystem } from "@pixi/events"
import { AnimatedSprite } from '@pixi/sprite-animated'

import { NineSlicePlane } from '@pixi/mesh-extras'
import { Text, TextStyle } from '@pixi/text'
import { Loader } from '@pixi/loaders'

import rect from '../rect.png'
import girl from '../mono/girl.png'

// https://pixijs.com/8.x/guides/components/interaction


class Monster extends Sprite {
    app
    constructor(x = 0, y = 0, texture, name = 'none', hp = 100, speed = 5, app) {
        super(texture)
        this.anchor.set(0.5)
        this.name = name
        this.hp = hp
        this.speed = speed
        this.y = y
        this.x = x
        this.app = app
    }

    status() {
        return this.name + " has " + this.hp + " hit points"
    }

    move() {

        this.x = this.x + this.speed

        if ((this.x > this.app.view.width - (this.width / 2)) 
             || (this.x < 200)
        )
             {
                this.speed = -this.speed

        }
    }
}

export class Start {
    app
    plaerSheet = {}
    player
    girl
    loader
    constructor() {
        this.app = new Application({ resizeTo: window, backgroundColor: "0xAAAAAA" })
        document.getElementById('root').appendChild(this.app.view)
        const events = new EventSystem(this.app.renderer);
        events.domElement = this.app.renderer.view;

        this.loader = new Loader()
        this.loader.add('girl', girl)
        this.loader.onComplete.add((e) => { this.dameLoader(e) })
        this.loader.load()
    }

    dameLoader(e) {
        let data = e.resources['girl']
          this.girl = new Monster(200, 200, data.texture, 'girl', 100, 6, this.app)
          this.app.stage.addChild(this.girl)

        this.app.ticker.add((e) => { this.gameLoop(e) })
    }

    gameLoop(e) {
this.girl.move()
    }
}