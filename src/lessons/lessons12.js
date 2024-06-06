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
import { TilingSprite } from '@pixi/sprite-tiling'

import back from '../parallax-forest-back-trees.png'
import front from '../parallax-forest-front-trees.png'
import lights from '../parallax-forest-lights.png'
import middle from '../parallax-forest-middle-trees.png'
import { spread } from 'axios'

// https://pixijs.com/8.x/guides/components/interaction


export class Start {
    app
    loader
    bgBack
    bgMiddle
    bgFront
    bgX = 0
    bgSpeed = 1
    constructor() {
        this.app = new Application({ resizeTo: window, backgroundColor: "0xAAAAAA" })
        document.getElementById('root').appendChild(this.app.view)
        const events = new EventSystem(this.app.renderer);
        events.domElement = this.app.renderer.view;

        this.loader = new Loader()
        this.loader
            .add('back', back)
            .add('front', front)
            .add('lights', lights)
            .add('middle', middle)

        this.loader.onComplete.add((e) => {

            this.bgBack = this.cretaBg(this.loader.resources['back'].texture)
            this.bgMiddle = this.cretaBg(this.loader.resources['middle'].texture)
            this.bgFront = this.cretaBg(this.loader.resources['front'].texture)

            document.addEventListener('keyup', (e) => {this.swichDir(e)})


            this.app.ticker.add(() => {
                this.loop();
            })
        });

        this.loader.load();

    }


    cretaBg(texture) {
        let tiling = new TilingSprite(texture, 240, 160)
        tiling.position.set(0, 0)
        this.app.stage.addChild(tiling)
        return tiling
    }

    loop() {
     this.updateBg()

    }

    updateBg(){
        this.bgX = this.bgX + this.bgSpeed
        
        this.bgFront.tilePosition.x = this.bgX
        this.bgMiddle.tilePosition.x = this.bgX /2 
        this.bgBack.tilePosition.x = this.bgX / 4
    }

    swichDir(e){
         console.log(e.keyCode)
        switch (e.keyCode) {
            case 37:  //left
            console.log(this.bgSpeed)
                this.bgSpeed = this.bgSpeed -1
                break;
                case 39:  //
                this.bgSpeed = this.bgSpeed + 1
                break;
                case 32:  //
                this.bgSpeed =0
                break;
        
            default:
                break;
        }
    }

}