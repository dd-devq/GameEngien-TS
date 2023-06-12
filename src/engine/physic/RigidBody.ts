import { Component } from '../core/Component'
class RigidBody extends Component {
    // Variables
    public mass = 1
    public drag = 0
    public useGravity = true

    private velocity: Vector2 = Vector2.zero
    private force: Vector2 = Vector2.zero

    // Properties
    get Velocity(): Vector2 {
        return this.velocity
    }

    set Velocity(value: Vector2) {
        this.velocity = value
    }

    get Force(): Vector2 {
        return this.force
    }

    set Force(value: Vector2) {
        this.force = value
    }

    override update(deltaTime: number) {
        // Apply forces
        const acceleration: Vector2 = this.force.Divide(this.mass)
        this.velocity = this.velocity.Add(acceleration.Multiply(Time.deltaTime))

        // Apply drag
        this.velocity = this.velocity.Subtract(this.velocity.Multiply(this.drag * Time.deltaTime))

        // Apply gravity
        if (this.useGravity) {
            this.velocity = this.velocity.Add(Vector2.Scale(Physics2D.gravity, Time.deltaTime))
        }

        // Update position
        this.transform.position = this.transform.position.Add(this.velocity.Multiply(deltaTime))

        // Reset accumulated force
        this.force = Vector2.zero
    }
}

export { RigidBody }
