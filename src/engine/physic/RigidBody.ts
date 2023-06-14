import { Logger } from '../Engine'
import { Component } from '../core/Component'
import { Renderer } from '../graphic/Renderer'
import { Vector2 } from '../utils/Math'

class RigidBody extends Component {
    public acceleration: Vector2
    public velocity: Vector2

    public mass: number
    public G = -9.8
    public isSimulated = false

    constructor(gameObject: IRenderable, mass: number) {
        super(gameObject)
        this.mass = mass
        this.acceleration = new Vector2(0, 0)
        this.velocity = new Vector2(0, 0)
        this.isDrawable = false
    }

    public applyGravity(): void {
        const gravityForce = new Vector2(0, this.G * this.mass * 0.5)
        this.applyForce(gravityForce)
    }

    applyForce(force: Vector2): void {
        const scaledForce = force.div(this.mass)
        this.acceleration.equal(this.acceleration.add(scaledForce))
    }

    public override update(deltaTime: number): void {
        if (this.isSimulated) {
            this.applyGravity()
            this.velocity.equal(this.velocity.add(this.acceleration.scale(deltaTime + 0.05)))
            this.parent.position.equal(this.parent.position.add(this.velocity))
            this.resetAcceleration()
        }
    }

    public override render(renderer: Renderer): void {
        if (this.isDrawable) {
            Logger.info('Rigid Body is not drawable!')
        }
    }

    public resetAcceleration(): void {
        this.acceleration = new Vector2(0, 0)
    }

    public resetVelocity(): void {
        this.velocity = new Vector2(0, 0)
    }
}

export { RigidBody }
