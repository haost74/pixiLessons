import { Application } from '@pixi/app'
import { Sprite } from '@pixi/sprite'
import { AnimatedSprite } from '@pixi/sprite-animated'
import { Button, Input, ScrollBox } from '@pixi/ui'
import { Container } from '@pixi/display'
import { Graphics } from '@pixi/graphics'
import { Texture, BaseTexture, Rectangle } from '@pixi/core'
import { EventSystem } from "@pixi/events";
import { Loader } from '@pixi/loaders'

import { NineSlicePlane } from '@pixi/mesh-extras'
import { Text, TextStyle } from '@pixi/text'

import rect from '../rect.png'
import { isConstructorDeclaration } from 'typescript'

import viking from '../viking.png'

// https://pixijs.com/8.x/guides/components/interaction
var sp

export class Start {
    app
    loader
    keys = {}
    keysDiv
    player
    plaerSheet = {}
    speed = 2
    constructor() {
        this.app = new Application({ resizeTo: window, backgroundColor: "0xAAAAAA" })
        document.getElementById('root').appendChild(this.app.view)
        const events = new EventSystem(this.app.renderer);
        events.domElement = this.app.renderer.view;

        this.loader = new Loader()
        this.loader.add('viking', viking)
        this.loader.load((e) => { this.doneLoading(e) })


        window.addEventListener('keydown', this.keyDown)
        window.addEventListener('keyup', this.keyUp)

    }

    doneLoading(e) {
        this.createPlayerSheet()
        this.createPlayer()
        this.app.ticker.add((e) => { this.gameLoop(e) })
    }


    createPlayerSheet() {
        let nm = this.loader.resources['viking']
        let ssheet = BaseTexture.from(nm.url)

        let w = 40
        let h = 65

        this.plaerSheet['standSouth'] = [new Texture(ssheet, new Rectangle(1 * w, 0, w, h))]
        this.plaerSheet['standWest'] = [new Texture(ssheet, new Rectangle(4 * w, 0, w, h))]
        this.plaerSheet['standEast'] = [new Texture(ssheet, new Rectangle(7 * w, 0, w, h))]
        this.plaerSheet['standNorth'] = [new Texture(ssheet, new Rectangle(10 * w, 0, w, h))]

        this.plaerSheet['walkSouth'] = [
            new Texture(ssheet, new Rectangle(0 * w, 0, w, h)),
            new Texture(ssheet, new Rectangle(1 * w, 0, w, h)),
            new Texture(ssheet, new Rectangle(2 * w, 0, w, h))
        ]

        this.plaerSheet['walkWest'] = [
            new Texture(ssheet, new Rectangle(3 * w, 0, w, h)),
            new Texture(ssheet, new Rectangle(4 * w, 0, w, h)),
            new Texture(ssheet, new Rectangle(5 * w, 0, w, h))
        ]

        this.plaerSheet['walkEast'] = [
            new Texture(ssheet, new Rectangle(6 * w, 0, w, h)),
            new Texture(ssheet, new Rectangle(7 * w, 0, w, h)),
            new Texture(ssheet, new Rectangle(8 * w, 0, w, h))
        ]

        this.plaerSheet['walkNorth'] = [
            new Texture(ssheet, new Rectangle(9 * w, 0, w, h)),
            new Texture(ssheet, new Rectangle(10 * w, 0, w, h)),
            new Texture(ssheet, new Rectangle(11 * w, 0, w, h))
        ]
    }

    createPlayer() {
        this.player = new AnimatedSprite(this.plaerSheet.walkSouth)
        this.player.anchor.set(0.5)
        this.player.animationSpeed = .5
        this.player.loop = false
        this.player.x = this.app.view.width / 2
        this.player.y = this.app.view.height / 2
        this.app.stage.addChild(this.player)
        this.player.play()
    }

    keyDown(e) {
        this.keys[e.keyCode] = true
    }

    keyUp(e) {
        this.keys[e.keyCode] = false
    }

    gameLoop(own) {
        if (this.keysDiv === undefined) this.keysDiv = document.querySelector('#keys')
        this.keysDiv.innerHTML = JSON.stringify(keys)

        //W
        if (keys['87']) {

            if (!this.player.playing) {
                this.player.textures = this.plaerSheet.walkNorth
                this.player.play()
            }
            this.player.y -= this.speed
        }

        //A
        if (keys['65']) {
            if (!this.player.playing) {
                this.player.textures = this.plaerSheet.walkWest
                this.player.play()
            }
            this.player.x -= this.speed
        }

        if (keys['68']) {
            if (!this.player.playing) {
                this.player.textures = this.plaerSheet.walkEast
                this.player.play()
            }
            this.player.x += this.speed
        }

        //S
        if (keys['88']) {
            if (!this.player.playing) {
                this.player.textures = this.plaerSheet.walkSouth
                this.player.play()
            }
            this.player.y += this.speed
        }
    }

}