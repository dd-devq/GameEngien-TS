import { Position } from '../utils/Math'
import { Component } from '../core/Component'
import { Renderer } from '../graphic/Renderer'

class BoxCollider extends Component {
    public showCollider: boolean
    private width: number
    private height: number

    constructor(width: number, height: number, position?: Position) {
        super(position)
        this.width = width
        this.height = height
        this.showCollider = false
    }

    public override render(renderer: Renderer): void {
        if (this.showCollider) {
            // renderer draw
        }
    }

    // checkCollision(otherCollider: BoxCollider): boolean {
    //     if (
    //         this.position.x < otherCollider.position.x + otherCollider.width &&
    //         this.position.x + this.width > otherCollider.position.x &&
    //         this.position.y < otherCollider.position.y + otherCollider.height &&
    //         this.position.y + this.height > otherCollider.position.y
    //     ) {
    //         return true
    //     }
    //     return false
    // }
}

class CapsuleCollider extends Component {}

export { BoxCollider, CapsuleCollider }
