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
import bullet from '../bullet.png'

// https://pixijs.com/8.x/guides/components/interaction


export class Start {
    app;
    bullets = []
    bulletSpeed = 10
    constructor() {
        this.app = new Application({
            width: 600,
            height: 600,
            backgroundColor: "0xAAAAAA"
        })
        document.getElementById('root').appendChild(this.app.view)
        const events = new EventSystem(this.app.renderer);
        events.domElement = this.app.renderer.view;

        let sprite = Sprite.from(rect)
        sprite.anchor.set(0.5);

        sprite.x = this.app.screen.width / 2
        sprite.y = this.app.screen.height / 2
        this.app.stage.addChild(sprite);
        // sprite.on('pointerdown', (e) => {
        //     console.log("STEP")
        // })
        sprite.eventMode = 'static';

        document.querySelector('#root').addEventListener('pointerdown', (e) => {
            let _bullet = this.createBullet(sprite)
            this.bullets.push(_bullet)
        })

        this.app.ticker.add(() => {
            this.gameLoop()


        })

    }

    createBullet(sprite) {
        let bulletSprite = Sprite.from(bullet)
        bulletSprite.anchor.set(0.5);
        bulletSprite.x = sprite.x
        bulletSprite.y = sprite.y
        bulletSprite.speed = this.bulletSpeed
        this.app.stage.addChild(bulletSprite)

        return bulletSprite
    }

    updateBullets(delte) {

        
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].position.y -= this.bullets[i].speed

            if(this.bullets[i].position.y < 0){
                this.bullets.dead = true
            }
        }

        for (let i = 0; i < this.bullets.length; i++) {
             if(this.bullets[i].dead){
                this.app.stage.removeChild(this.bullets[i])
                this.bullets.splice(i,1)
            }
        }

    }

    gameLoop(delte) {
        this.updateBullets(delte)
    }

}