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
    rect

    // tint = this.NORMAL
    constructor() {
        this.app = new Application({ resizeTo: window, backgroundColor: "0xAAAAAA" })
        document.getElementById('root').appendChild(this.app.view)
        const events = new EventSystem(this.app.renderer);
        events.domElement = this.app.renderer.view;

        this.rect = new Graphics()
        this.rect.beginFill(NORMAL)
        this.rect.drawRect((this.app.view.width / 2) - 100, (this.app.view.height / 2) - 100, 200, 200)
        this.rect.endFill()
        this.rect.eventMode = 'static'

        this.rect.on('pointerup', this.pointerUp)
        this.rect.on('pointerdown', this.pointerDown)
        this.rect.on('pointerover', this.pointerOver)
        this.rect.on('pointerout', this.pointerOut)
        this.rect.on('pointerupoutside', this.pointerupoutSide)
        this.app.stage.addChild(this.rect)
    }

    pointerUp(){
        if (pointerIsOver) 
            this.tint = OVER
        else
            this.tint = NORMAL
        pointerIsDown = false
    }

    pointerDown() {
         this.tint = DOWN
        pointerIsDown = true
    }

    pointerOver()
    {
        if (!pointerIsOver) {
            pointerIsOver = true
            this.tint = OVER
        }
    }

    pointerOut()
    {
        if (!pointerIsDown) {
            pointerIsOver = false
            this.tint = NORMAL
        }
    }

    pointerupoutSide()
    {
        this.tint = NORMAL
        pointerIsOver = false
        pointerIsDown = false
    }

}