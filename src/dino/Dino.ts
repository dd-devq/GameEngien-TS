import {
    BoxCollider,
    RigidBody,
    GameObject,
    SpriteAnimator,
    Sprite,
    Vector2,
    FSMState,
    FSMSystem,
    InputManager,
    Renderer,
} from '../engine/Engine'

class Dino extends GameObject {
    public boxCollider: BoxCollider
    public rigidBody: RigidBody
    public nowRenderingResource: IRenderResource | undefined
    public dinoAnimator: SpriteAnimator
    public dinoFSMSystem: DinoFSMSystem
    public DEFAULT_POSITION: Vector2
    public gravity: Vector2 = new Vector2(0, 100)

    constructor(name: string, position?: Vector2) {
        super(name, position)
        if (position !== undefined) {
            this.DEFAULT_POSITION = position
            this.rigidBody = new RigidBody(this, new Vector2(0, 0))
        }
        this.boxCollider = new BoxCollider(this, 200, 200)
        this.addComponent(this.boxCollider)
        this.nowRenderingResource = new Sprite(this, 'assets\\Dino\\dinoIdle.png')
        this.addComponent(this.rigidBody)
        this.dinoFSMSystem = new DinoFSMSystem(this)
        this.addComponent(this.dinoFSMSystem)
    }

    public override update(deltaTime: number): void {
        super.update(deltaTime)
        if (this.isUpdated) {
            this.nowRenderingResource = this.dinoAnimator.getCurrentFrame()
        }
    }

    public override render(renderer: Renderer): void {
        if (this.isActive) {
            renderer.drawSprite(this.nowRenderingResource as Sprite, this.position)
        }
    }

    public jump(): void {
        console.log(this.position)
    }
    public override reset(): void {
        //
    }
}

class DinoFSMSystem extends FSMSystem {
    public readyState: ReadyState
    public jumpingState: JumpingState
    public deadSyate: DeadState
    public duckingState: DuckingState
    public runningState: RunningState

    constructor(dino: Dino) {
        super(dino)

        this.readyState = new ReadyState()
        this.jumpingState = new JumpingState()
        this.deadSyate = new DeadState()
        this.duckingState = new DuckingState()
        this.runningState = new RunningState()

        this.readyState.parent = this
        this.jumpingState.parent = this
        this.deadSyate.parent = this
        this.duckingState.parent = this
        this.runningState.parent = this

        this.addState(this.readyState)
        this.addState(this.jumpingState)
        this.addState(this.deadSyate)
        this.addState(this.duckingState)
        this.addState(this.runningState)
    }
}

class JumpingState extends FSMState {
    public override onEnter(): void {
        //
    }
    public override onExit(): void {
        //
    }
    public override onUpdate(deltaTime: number): void {
        if (
            (this.parent as DinoFSMSystem).Parent.position.y <=
            ((this.parent as DinoFSMSystem).Parent as Dino).DEFAULT_POSITION.y
        ) {
            this.parent.gotoState((this.parent as DinoFSMSystem).runningState)
        }
    }
}

class RunningState extends FSMState {
    public override onEnter(): void {
        (this.parent as DinoFSMSystem).dinoDataBinding.setAnim('Run')
    }
    public override onExit(): void {
        //
    }

    public override onUpdate(deltaTime: number): void {
        if (InputManager.getInstance().isKeyPressed('ArrowDown')) {
            this.parent.gotoState((this.parent as DinoFSMSystem).duckingState)
        } else if (InputManager.getInstance().isKeyPressed(' ')) {
            this.parent.gotoState((this.parent as DinoFSMSystem).jumpingState)
        }
    }
}

class DuckingState extends FSMState {
    public override onEnter(): void {
        (this.parent as DinoFSMSystem).dinoDataBinding.setAnim('Crouch')
    }

    public override onExit(): void {
        //
    }

    public override onUpdate(deltaTime: number): void {
        if (!InputManager.getInstance().isKeyPressed('ArrowDown')) {
            this.parent.gotoState((this.parent as DinoFSMSystem).runningState)
        }
    }
}

class DeadState extends FSMState {
    public override onEnter(): void {
        (this.parent as DinoFSMSystem).dinoDataBinding.setAnim('Dead')
    }

    public override onExit(): void {
        //
    }

    public override onUpdate(deltaTime: number): void {
        if (InputManager.getInstance().isKeyPressed(' ')) {
            this.parent.gotoState((this.parent as DinoFSMSystem).readyState)
        }
    }
}

class ReadyState extends FSMState {
    public override onEnter(): void {
        (this.parent as DinoFSMSystem).dinoDataBinding.setAnim('Idle')
    }
    public override onExit(): void {
        //
    }
    public override onUpdate(deltaTime: number): void {
        if (InputManager.getInstance().isKeyPressed(' ')) {
            this.parent.gotoState((this.parent as DinoFSMSystem).runningState)
        }
    }
}

export { Dino }
