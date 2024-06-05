import { Application } from '@pixi/app'
import { Loader  } from '@pixi/loaders'
import { extensions } from '@pixi/core';
import { Sprite } from '@pixi/sprite'
import { Button, Input, ScrollBox } from '@pixi/ui'
import { Container } from '@pixi/display'
import { Graphics } from '@pixi/graphics'
import { EventSystem } from "@pixi/events";

import { NineSlicePlane } from '@pixi/mesh-extras'
import { Text, TextStyle } from '@pixi/text'

import rect from '../rect.png'
import bloat01 from '../bloat01.png'
import bloat02 from '../bloat02.png'
import bloat03 from '../bloat03.png'
import bloat04 from '../bloat04.png'
import bloat05 from '../bloat05.png'
import bloat06 from '../bloat06.png'
import bloat07 from '../bloat07.png'
import bloat08 from '../bloat08.png'
import bloat09 from '../bloat09.png'
import bloat10 from '../bloat10.png'

// https://pixijs.com/8.x/guides/components/interaction


export class Start{
    app;
    constructor(){
        this.app = new Application({resizeTo: window, backgroundColor:"0xAAAAAA"})
        document.getElementById('root').appendChild(this.app.view)
        const events = new EventSystem(this.app.renderer);
        events.domElement = this.app.renderer.view;

        const loader = new Loader()
        loader.add('sprite01',bloat01)
            .add('sprite02',bloat02)
            .add('sprite03',bloat03)
            .add('sprite04',bloat04)
            .add('sprite05',bloat05)
            .add('sprite06',bloat06)
            .add('sprite07',bloat07)
            .add('sprite08',bloat08)
            .add('sprite09',bloat09)
            .add('sprite10',bloat10)

       loader.onProgress.add((e) => {
            console.log(e.progress)
       })

       loader.onComplete.add(() => {

       }); 

       loader.onError.add((e) => {
            console.log("ERROR " + e.message)
       }); 

        loader.onLoad.add((e) => {
            //console.log('DONE LOADING')
        });

        loader.load((loader, resources) => {
            console.log('DONE LOADING')

            let sprite2 = Sprite.from(resources.sprite02.data)
            this.app.stage.addChild(sprite2);
            
        });
     }
     
}