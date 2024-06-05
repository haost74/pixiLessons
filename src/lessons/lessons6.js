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
import arcade from '../fonts/ARCADECLASSIC.TTF'
import maag from '../fonts/maagkramp.ttf'
import nallo from '../fonts/Nallo.ttf'

// https://pixijs.com/8.x/guides/components/interaction


export class Start {
    app;
    constructor() {
        this.app = new Application({ resizeTo: window, backgroundColor: "0xAAAAAA" })
        document.getElementById('root').appendChild(this.app.view)
        const events = new EventSystem(this.app.renderer);
        events.domElement = this.app.renderer.view;

        const style = new TextStyle({
            fontFamily: maag,
            fontSize: 100,
            fontWeight: 'bold',
            fill: ['#ffa512', '#ff9e00'], // gradient
            stroke: '#fff',
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 2,
        });

        console.log(nallo)

        const style2 = new TextStyle({
            //fontFamily:'../fonts/Nallo.TTF',
            fontSize: 100,
        })

        const richText = new Text('Game App', style2);
        richText.x = 50;
        richText.y = 250;

        //this.app.stage.addChild(richText);

        const style3 = new TextStyle({
            fontFamily:'../fonts/Nallo.TTF',
            fontSize: 100,
        })

        const richText1 = new Text('Stop', style3);
        richText1.x = 150;
        richText.y = 250;

        this.app.stage.addChild(richText1);

    }

}