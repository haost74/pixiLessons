import { Application } from '@pixi/app'
import { Sprite } from '@pixi/sprite'
import { Button, Input, ScrollBox } from '@pixi/ui'
import { Container } from '@pixi/display'
import { Graphics } from '@pixi/graphics'
import { Texture } from '@pixi/core'
import { EventSystem } from "@pixi/events";

import { NineSlicePlane } from '@pixi/mesh-extras'
import { Text, TextStyle } from '@pixi/text'

//import rect from '../rect.png'

// https://pixijs.com/8.x/guides/components/interaction

var pointerIsDown = false
var pointerIsOver = false
const NORMAL = 0xFFFFFF
const OVER = 0x00FF00
const DOWN = 0xFF0000

export class Start {
    app
    r1
    r2
    r3
    RECT_W = 100
    RECT_H = 100

    constructor() {
        this.app = new Application({ resizeTo: window, backgroundColor: "0xAAAAAA" })
        document.getElementById('root').appendChild(this.app.view)
        const events = new EventSystem(this.app.renderer);
        events.domElement = this.app.renderer.view;


        this.r1 = this.createdRect(100, 450, this.RECT_W, this.RECT_H, 'rect01', 20)
        this.r2 = this.createdRect(300, 450, this.RECT_W, this.RECT_H, 'rect02', 40)
        this.r3 = this.createdRect(500, 450, this.RECT_W, this.RECT_H, 'rect03', 80)

        this.app.stage.addChild(this.r1)
        this.app.stage.addChild(this.r2)
        this.app.stage.addChild(this.r3)

    }

    createdRect(x, y, w, h, name, speed) {
        let rect = new Graphics()
        rect.beginFill(NORMAL)
        rect.drawRect(x, y, w, h)
        rect.endFill()
        rect.eventMode = 'static'

        rect.on('pointerup', this.pointerUp)
        rect.on('pointerdown', this.pointerDown)
        rect.on('pointerover', this.pointerOver)
        rect.on('pointerout', this.pointerOut)
        rect.on('pointerupoutside', this.pointerupoutSide)

        rect.name = name
        rect.speed = speed
        return rect
    }

    pointerUp() {
        if (pointerIsOver){
            this.tint = OVER
            this.y -= this.speed
            console.log("moving -> " + this.name)
        }
        else
            this.tint = NORMAL
        pointerIsDown = false
    }

    pointerDown() {
        this.tint = DOWN
        pointerIsDown = true
    }

    pointerOver() {
        if (!pointerIsOver) {
            pointerIsOver = true
            this.tint = OVER
        }
    }

    pointerOut() {
        if (!pointerIsDown) {
            pointerIsOver = false
            this.tint = NORMAL
        }
    }

    pointerupoutSide() {
        this.tint = NORMAL
        pointerIsOver = false
        pointerIsDown = false
    }

}