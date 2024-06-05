import { Text, TextStyle } from '@pixi/text'

export class styles
{
    button_styles(){
        return { fontFamily: 'Bangers',
        fontSize: 12,
        fontWeight: 'bold',
        fill: ['#ffa512', '#ff9e00'], // gradient
        stroke: '#fff',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 2,}
    }
}