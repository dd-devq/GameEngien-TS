import { Renderer } from './Renderer'
import { Component } from '../core/Component'

class Sprite extends Component {
    public image: HTMLImageElement

    constructor(gameObject: IRenderable, img_src: string) {
        super(gameObject)
        this.image = new Image()
        this.image.src = img_src
    }

    public override update(deltaTime: number): void {
        if (this.isActive) {
            //update
        }
    }
    public override render(renderer: Renderer): void {
        if (this.isActive && this.isDrawable) {
            // render
        }
    }
}

export { Sprite }
