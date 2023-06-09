import { Engine } from '../engine'
import { Position } from '../engine/Engine'

class Ground extends Engine.GameObject {
    private nowRenderingResource: IRenderResource

    constructor(position?: Position) {
        super('Ground', position)
    }

    private loadResource(name: string) {}
}

export { Ground }
