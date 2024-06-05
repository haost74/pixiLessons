import { Application } from '@pixi/app'
import { Sprite } from '@pixi/sprite'
import { Button, Input, ScrollBox } from '@pixi/ui'
import { Container } from '@pixi/display'
import { Graphics } from '@pixi/graphics'
import { Texture } from '@pixi/core'
import { EventSystem } from "@pixi/events";

import { NineSlicePlane } from '@pixi/mesh-extras'
import { Text, TextStyle } from '@pixi/text'

import rect from '../rect.png'

// https://pixijs.com/8.x/guides/components/interaction


export class Start {
    app
    enemy
    sprite
    speed = 4
    constructor() {
        this.app = new Application(
            {
                width: 600,
                height: 600,
                backgroundColor: "0xAAAAAA"
            })
        document.getElementById('root').appendChild(this.app.view)
        const events = new EventSystem(this.app.renderer);
        events.domElement = this.app.renderer.view;


        this.sprite = Sprite.from(rect)
        this.sprite.anchor.set(0.5)
        this.sprite.x = 16
        this.sprite.y = this.app.screen.height / 2
        this.app.stage.addChild(this.sprite);

        this.enemy = Sprite.from(rect)
        this.enemy.anchor.set(0.5)
        this.enemy.x = this.app.screen.width - 16
        this.enemy.y = this.app.screen.height / 2
        this.app.stage.addChild(this.enemy);

        this.app.ticker.add((delta) => {
            this.gameLoop(delta)
        })


    }

    gameLoop(delta) {
        this.sprite.x += this.speed
        this.enemy.x -= this.speed

        if (this.rectsIntersect(this.sprite, this.enemy)) {
            this.speed = 0
        }

    }

    rectsIntersect(a, b) {
        let aBox = a.getBounds()
        let bBox = b.getBounds()

        return (aBox.x + aBox.width > bBox.x &&
            bBox.x < bBox.x + bBox.width &&
            aBox.y + aBox.height > bBox.y &&
            aBox.y < bBox.y + bBox.height)

    }

}