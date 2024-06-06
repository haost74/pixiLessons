import { Application } from '@pixi/app'
import { Sprite } from '@pixi/sprite'
import { Button, Input, ScrollBox } from '@pixi/ui'
import { Container } from '@pixi/display'
import { Graphics } from '@pixi/graphics'
import { Texture } from '@pixi/core'
import { EventSystem } from "@pixi/events";

import { NineSlicePlane } from '@pixi/mesh-extras'
import { Text, TextStyle } from '@pixi/text'
import { Loader } from '@pixi/loaders'

import rect from '../rect.png'
import idle_girl from '../girl-1-Photoroom.png'
import down_girl from '../girl-4-Photoroom.png'
import over_girl from '../girl-2-Photoroom.png'

// https://pixijs.com/8.x/guides/components/interaction


export class Start {
    app
    loader
    girl
    pointerIsDown = false
    pointerIsOver = false
    constructor() {
        this.app = new Application({ resizeTo: window, backgroundColor: "0xAAAAAA" })
        document.getElementById('root').appendChild(this.app.view)
        const events = new EventSystem(this.app.renderer);
        events.domElement = this.app.renderer.view;

        this.loader = new Loader()

        this.loader
            .add('idle', idle_girl)
            .add('down', down_girl)
            .add('over', over_girl)

        this.loader.onComplete.add((e) => {
            this.girl = Sprite.from(this.loader.resources['idle'].url)
            this.girl.anchor.set(0.5)
            this.girl.x = this.app.view.width / 2
            this.girl.y = this.app.view.height / 2
            this.girl.eventMode = 'static'
            this.girl.buttonMode = true

            this.girl.on('pointerup', (e) => { this.pointerUp() })
            this.girl.on('pointerupoutside', (e) => { this.pointerupoutSide() })
            this.girl.on('pointerdown', (e) => { this.pointerDown() })
            this.girl.on('pointerover', (e) => { this.pointerOver() })
            this.girl.on('pointerout', (e) => { this.pointerOut() })
            this.app.stage.addChild(this.girl)


        });

        this.loader.load();

    }

    pointerUp() {
        if (this.pointerIsOver) {
            this.girl.texture = this.loader.resources['over'].texture
        }
        else {
            this.girl.texture = this.loader.resources['idle'].texture
        }

        this.pointerIsDown = false
    }

    pointerupoutSide() {
        this.girl.texture = this.loader.resources['idle'].texture
        this.pointerIsDown = false
        this.pointerIsOver = true
    }

    pointerDown() {

        
        this.pointerIsDown = true
        this.girl.texture = this.loader.resources['down'].texture
    }

    pointerOver() {
       
        this.pointerIsOver = true
        this.girl.texture = this.loader.resources['over'].texture
    }
    pointerOut() {
        
        if (!this.pointerIsDown) {
            this.girl.texture = this.loader.resources['idle'].texture
            this.pointerIsOver = false
        }
    }

}