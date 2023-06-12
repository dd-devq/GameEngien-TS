import { Renderer } from './Renderer'
import { Component } from '../core/Component'

class Sprite extends Component {
    public image: HTMLImageElement

    constructor(img_src: string) {
        super()
        this.image = new Image()
        this.image.src = img_src
    }

    public override update(deltaTime: number): void {
        if (this.isActive) {
            //update
        }
    }
    public override render(renderer: Renderer): void {
        if (this.isActive) {
            // render
        }
    }
}

export { Sprite }
