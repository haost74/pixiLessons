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
import { isConstructorDeclaration } from 'typescript'

// https://pixijs.com/8.x/guides/components/interaction
var sp

export class Start{
    app
    keys = {}
    keysDiv
    sprite
    constructor(){
        this.app = new Application({resizeTo: window, backgroundColor:"0xAAAAAA"})
        document.getElementById('root').appendChild(this.app.view)
        const events = new EventSystem(this.app.renderer);
        events.domElement = this.app.renderer.view;
       
        this.sprite= Sprite.from(rect)
        this.sprite.anchor.set(0.5);
        this.sprite.eventMode = 'static';

            this.sprite.x = this.app.screen.width  / 2
            this.sprite.y = this.app.screen.height / 2
            this.sprite.on('pointermove', (e) => {
                let pos = e.global
                this.sprite.x = pos.x
                this.sprite.y = pos.y
            })
            this.app.stage.addChild(this.sprite);

            window.addEventListener('keydown', this.keyDown)
            window.addEventListener('keyup', this.keyUp)

            this.app.ticker.add(this.gameLoop)
            sp = this.sprite
           // this.keysDiv = document.querySelector('#keys')

     }

     keyDown(e){
        this.keys[e.keyCode] = true
     }

     keyUp(e){
        this.keys[e.keyCode] = false
     }

     gameLoop(own){
        if(this.keysDiv === undefined) this.keysDiv = document.querySelector('#keys')
        this.keysDiv.innerHTML =  JSON.stringify(keys)

        if(keys['87']){
            if(sp.y > 6)
            sp.y -= 5
        }

        if(keys['65']){
            if(sp.x > 6)
            sp.x -= 5
        }

        if(keys['68']){
            //if(sp.x > 6)
            sp.x += 5
        }

        if(keys['88']){
            //if(sp.y > 6)
            sp.y += 5
        }
     }
     
}