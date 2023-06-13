import { Component } from '../core/Component'
import { Renderer } from '../graphic/Renderer'

class BoxCollider extends Component {
    public showCollider: boolean
    private width: number
    private height: number

    constructor(parent: IRenderable, width: number, height: number) {
        super(parent)
        this.width = width
        this.height = height
        this.showCollider = true
    }

    public override render(renderer: Renderer): void {
        console.log(this.showCollider && this.isDrawable)
        if (this.showCollider && this.isDrawable) {
            renderer.drawRect(this.parent.position, this.width, this.height)
        }
    }
    public override update(deltaTime: number): void {
        if (this.isActive) {
            //update
        }
    }

    checkCollision(collider: BoxCollider): boolean {
        if (
            this.parent.position.x < collider.parent.position.x + collider.width &&
            this.parent.position.x + this.width > collider.parent.position.x &&
            this.parent.position.y < collider.parent.position.y + collider.height &&
            this.parent.position.y + this.height > collider.parent.position.y
        ) {
            return true
        }
        return false
    }
}
export { BoxCollider }
