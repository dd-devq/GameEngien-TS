import { Component } from '../core/Component'
import { Renderer } from '../graphic/Renderer'
import { Vector2 } from '../utils/Math'

class RigidBody extends Component {
    public acceleration: Vector2
    public ground: number
    public gravityScale: number
    public velocity: Vector2
    public force: Vector2

    constructor(gameObject: IRenderable, acceleration: Vector2) {
        super(gameObject)
        this.ground = this.parent.position.y
        this.isDrawable = false
    }

    public override update(deltaTime: number): void {
        // if (this.gravityScale) {
        //     this.velocity = Vec2.add(
        //         this.velocity,
        //         Vec2.mul(new Vec2(this.force.x, this.force.y - g * this.gravityScale), delta / 1000)
        //     )
        // }
        // this.parent.setPosition(
        //     Vec2.add(this.parent.getPosition(), Vec2.mul(this.velocity, delta / 1000))
        // )
        // if (this.gravityScale) {
        //     if (this.parent.getPosition().y < this.ground) {
        //         // Ground
        //         this.velocity = new Vector2(this.velocity.x, 0)
        //         this.g = 0
        //         this.force
        //         this.parent.setPosition(new Vector2(this.parent.position.x, this.ground))
        //     }
        // }
    }
    public override render(renderer: Renderer): void {
        if (this.isDrawable) {
            // render
        }
    }
}

export { RigidBody }
