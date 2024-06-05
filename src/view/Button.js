import { styles } from './style'
import { Text, TextStyle } from '@pixi/text'
import { Graphics, Rectangle } from '@pixi/graphics'

export class Button{
    text;
    constructor(app, context){
       this.text = new Text(context, styles.Button)
    }
}