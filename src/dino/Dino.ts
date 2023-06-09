import { BoxCollider, RigidBody, GameObject, SpriteAnimator } from '../engine/Engine'

class Dino extends GameObject {
    public boxCollider: BoxCollider
    public rigidBody: RigidBody
    public nowRenderingResource: IRenderResource
    public animator: SpriteAnimator

    constructor() {
        super('Dino')
        this.boxCollider = new BoxCollider(200, 200)
        this.rigidBody = new RigidBody()
        // this.nowRendering = ResourceManager.load("dinoIdle");
    }
}

export { Dino }
