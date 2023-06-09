import { Position } from '../utils/Math'
import { Component } from '../core/Component'

class BoxCollider extends Component {
    public showCollider: boolean
    private width: number
    private height: number

    constructor(width: number, height: number, position?: Position) {
        super(position)
    }

    public override render(): void {}
}

class CapsuleCollider extends Component {}

export { BoxCollider, CapsuleCollider }
