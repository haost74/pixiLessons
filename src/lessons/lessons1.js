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


export class Start{
    app
    constructor(){
        this.app = new Application({resizeTo: window, backgroundColor:"0xAAAAAA"})
        document.getElementById('root').appendChild(this.app.view)
        const events = new EventSystem(this.app.renderer);
        events.domElement = this.app.renderer.view;
       
        let sprite = Sprite.from(rect)
        sprite.anchor.set(0.5);

            sprite.x = this.app.screen.width  / 2
            sprite.y = this.app.screen.height / 2
            this.app.stage.addChild(sprite);
            sprite.on('pointermove', (e) => {
                let pos = e.global
                sprite.x = pos.x
                sprite.y = pos.y
            })
            sprite.eventMode = 'static';

     }
     
}