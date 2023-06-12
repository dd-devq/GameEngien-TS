import {
    BoxCollider,
    RigidBody,
    GameObject,
    SpriteAnimator,
    Position,
    Sprite,
} from '../engine/Engine'
import { InputManager } from '../engine/core/InputManager'
import { Renderer } from '../engine/graphic/Renderer'

class Dino extends GameObject {
    public boxCollider: BoxCollider
    public rigidBody: RigidBody
    public nowRenderingResource: IRenderResource | undefined
    public dinoAnimator: SpriteAnimator

    constructor(name: string, position?: Position) {
        super(name, position)
        this.boxCollider = new BoxCollider(200, 200)
        this.rigidBody = new RigidBody()
    }

    public override update(deltaTime: number): void {
        this.nowRenderingResource = this.dinoAnimator.getCurrentFrame()

        if (this.isUpdated) {
            if (InputManager.getInstance().isKeyPressed(' ')) {
            }
            if (InputManager.getInstance().isKeyPressed('ArrowDown')) {
            }
        }
    }

    public override render(renderer: Renderer): void {
        if (this.isActive) {
            renderer.drawSprite(this.nowRenderingResource as Sprite, this.position)
        }
    }
    public override reset(): void {}
}

class DinoStateManager {
    public changeState(): void {}
}

abstract class DinoState {
    public abstract onEnter(): void
    public abstract onExit(): void
    public abstract onUpdate(): void
}

class JumpingState extends DinoState {
    public override onEnter(): void {
        //
    }
    public override onExit(): void {
        //
    }
    public override onUpdate(): void {
        //
    }
}

class RunningState extends DinoState {
    public override onEnter(): void {
        //
    }
    public override onExit(): void {
        //
    }
    public override onUpdate(): void {
        //
    }
}

class DuckingState extends DinoState {
    public override onEnter(): void {
        //
    }
    public override onExit(): void {
        //
    }
    public override onUpdate(): void {
        //
    }
}

class DeadState extends DinoState {
    public override onEnter(): void {
        //
    }
    public override onExit(): void {
        //
    }
    public override onUpdate(): void {
        //
    }
}

class ReadyState extends DinoState {
    public override onEnter(): void {
        //
    }
    public override onExit(): void {
        //
    }
    public override onUpdate(): void {
        //
    }
}

export { Dino }
