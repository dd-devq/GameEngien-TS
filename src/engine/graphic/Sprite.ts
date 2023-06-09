import { Renderer } from './Renderer'
import { Component } from '../core/Component'

class Sprite extends Component {
    private image: HTMLImageElement

    constructor(img_src: string) {
        super()
        this.image = new Image()
        this.image.src = img_src
    }

    public override update(timeScale: number, deltaTime: number): void {
        if (timeScale != 0 && this.isActive) {
        }
    }
    public override render(renderer: Renderer): void {
        if (this.isActive) {
            // render
        }
    }
}

export { Sprite }
