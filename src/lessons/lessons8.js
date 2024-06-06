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
    titleScreen
    mainScreen
    endScreen
    constructor() {
        this.app = new Application({ resizeTo: window, backgroundColor: "0xAAAAAA" })
        document.getElementById('root').appendChild(this.app.view)
        const events = new EventSystem(this.app.renderer);
        events.domElement = this.app.renderer.view;
        window.addEventListener('keyup', (e) => { this.switchContainer(e) })

        //create our screens
        this.titleScreen = new Container()
        this.mainScreen = new Container()
        this.endScreen = new Container()

        this.mainScreen.visible = false
        this.endScreen.visible = false

        this.app.stage.addChild(this.titleScreen)
        this.app.stage.addChild(this.mainScreen)
        this.app.stage.addChild(this.endScreen)

        // setting title screen

        let redRect = new Graphics()
        redRect.beginFill(0xFF0000)
        redRect.drawRect(0, 0, this.app.view.width, this.app.view.height)

        this.titleScreen.addChild(redRect)

        this.addText('Title Page', this.titleScreen)


        // setting main screen

        let greenRect = new Graphics()
        greenRect.beginFill(0x00FF00)
        greenRect.drawRect(0, 0, this.app.view.width, this.app.view.height)

        this.mainScreen.addChild(greenRect)

        this.addText('Main Page', this.mainScreen)

        //  setting main screen

        let bluerRect = new Graphics()
        bluerRect.beginFill(0x0000FF)
        bluerRect.drawRect(0, 0, this.app.view.width, this.app.view.height)

        this.endScreen.addChild(bluerRect)

        this.addText('End Page', this.endScreen)

    }

    switchContainer(e) {
        this.titleScreen.visible = false
        this.mainScreen.visible = false
        this.endScreen.visible = false


        switch (e.key) {
            case '1':
                this.titleScreen.visible = true
                break;
            case '2':
                this.mainScreen.visible = true
                break;
            case '3':
                this.endScreen.visible = true
                break;

            default:
                this.titleScreen.visible = true
                break;
        }
    }

    addText(content, screen) {
        let text1 = new Text(content)
        text1.anchor.set(0.5)
        text1.x = this.app.view.width / 2
        text1.y = this.app.view.height / 2
        text1.style = new TextStyle({
            fill: 0x00000,
            fontSize: 40,
            fontFamily: 'Arial',
            fontStyle: 'bold',
            stroke: 0xFFFFFF,
            strokeThickness: 3
        })

        screen.addChild(text1)
    }

}