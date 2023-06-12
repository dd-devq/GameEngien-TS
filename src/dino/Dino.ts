import { BoxCollider, RigidBody, GameObject, SpriteAnimator } from '../engine/Engine'

class Dino extends GameObject {
    public boxCollider: BoxCollider
    public rigidBody: RigidBody
    public nowRenderingResource: IRenderResource
    public animator: SpriteAnimator
    public dinoState: DinoState

    constructor() {
        super('Dino')
        this.boxCollider = new BoxCollider(200, 200)
        this.rigidBody = new RigidBody()
        // this.nowRendering = ResourceManager.load("dinoIdle");
    }

    public setState(dinoState: DinoState): void {}
}

abstract class DinoState {}

class JumpingState extends DinoState {}

class RunningState extends DinoState {}

class DuckingState extends DinoState {}

class DeadState extends DinoState {}

class ReadyState extends DinoState {}

export { Dino }
