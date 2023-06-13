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
    public maxHeight = 25

    constructor(name: string, position?: Vector2) {
        super(name, position)
        if (position !== undefined) {
            this.DEFAULT_POSITION = position
            this.rigidBody = new RigidBody(this, 1)
        }
    }
    public init(): void {
        this.boxCollider = new BoxCollider(this, 200, 200)
        this.addComponent(this.boxCollider)
        this.nowRenderingResource = new Sprite(this, 'assets\\Dino\\dinoIdle.png')
        this.addComponent(this.rigidBody)
        this.dinoFSMSystem = new DinoFSMSystem(this)
        this.addComponent(this.dinoFSMSystem)
    }

    public override update(deltaTime: number): void {
        if (this.isUpdated) {
            super.update(deltaTime)
            this.nowRenderingResource = this.dinoAnimator.getCurrentFrame()
        }
    }

    public override render(renderer: Renderer): void {
        if (this.isActive) {
            renderer.drawSprite(this.nowRenderingResource as Sprite, this.position)
        }
    }

    public override reset(): void {
        //
    }
}

class DinoFSMSystem extends FSMSystem {
    public readyState: ReadyState
    public jumpingState: JumpingState
    public deadSyate: DeadState
    public crouchingState: CrouchingState
    public runningState: RunningState

    constructor(dino: Dino) {
        super(dino)

        this.readyState = new ReadyState()
        this.jumpingState = new JumpingState()
        this.deadSyate = new DeadState()
        this.crouchingState = new CrouchingState()
        this.runningState = new RunningState()

        this.readyState.parent = this
        this.jumpingState.parent = this
        this.deadSyate.parent = this
        this.crouchingState.parent = this
        this.runningState.parent = this

        this.addState(this.readyState)
        this.addState(this.jumpingState)
        this.addState(this.deadSyate)
        this.addState(this.crouchingState)
        this.addState(this.runningState)
    }
}

class JumpingState extends FSMState {
    public jumpInProgress: boolean
    public falling: boolean
    public jumpForce = 100

    public override onEnter(): void {
        this.falling = false
        this.jumpInProgress = true
        ;(<Dino> this.parent.Parent).dinoAnimator.play('Jump')
        ;(<Dino> this.parent.Parent).rigidBody.resetVelocity()
    }

    public override onExit(): void {
        this.jumpInProgress = false
        this.falling = false
        ;(<Dino> this.parent.Parent).rigidBody.resetVelocity()
    }
    public override onUpdate(deltaTime: number): void {
        (<Dino> this.parent.Parent).rigidBody.applyGravity()

        if (this.jumpInProgress && !this.falling) {
            if (this.parent.Parent.position.y <= (this.parent.Parent as Dino).maxHeight) {
                this.jump()
            } else {
                this.falling = true
            }
        }

        if (
            this.parent.Parent.position.y <= (this.parent.Parent as Dino).DEFAULT_POSITION.y &&
            !this.jumpInProgress
        ) {
            this.parent.gotoState((this.parent as DinoFSMSystem).runningState)
        }
    }

    public jump(): void {
        (this.parent.Parent as Dino).rigidBody.applyForce(new Vector2(0, this.jumpForce))
    }
}

class RunningState extends FSMState {
    public override onEnter(): void {
        (<Dino> this.parent.Parent).dinoAnimator.play('Run')
    }
    public override onExit(): void {
        //
    }

    public override onUpdate(deltaTime: number): void {
        if (this.parent.Parent.position.y <= (<Dino> this.parent.Parent).DEFAULT_POSITION.y) {
            this.parent.Parent.position.y = (<Dino> this.parent.Parent).DEFAULT_POSITION.y
        }

        if (InputManager.getInstance().isKeyPressed('ArrowDown')) {
            this.parent.gotoState((this.parent as DinoFSMSystem).crouchingState)
        } else if (InputManager.getInstance().isKeyPressed(' ')) {
            this.parent.gotoState((this.parent as DinoFSMSystem).jumpingState)
        }
    }
}

class CrouchingState extends FSMState {
    public crouchOffset = 20
    public override onEnter(): void {
        (<Dino> this.parent.Parent).dinoAnimator.play('Crouch')
        ;(<Dino> this.parent.Parent).DEFAULT_POSITION.y -= this.crouchOffset
        this.parent.Parent.position.y = (<Dino> this.parent.Parent).DEFAULT_POSITION.y
    }

    public override onExit(): void {
        (<Dino> this.parent.Parent).DEFAULT_POSITION.y += this.crouchOffset
        this.parent.Parent.position.y = (<Dino> this.parent.Parent).DEFAULT_POSITION.y
    }

    public override onUpdate(deltaTime: number): void {
        if (this.parent.Parent.position.y <= (<Dino> this.parent.Parent).DEFAULT_POSITION.y) {
            this.parent.Parent.position.y = (<Dino> this.parent.Parent).DEFAULT_POSITION.y
        }
        if (!InputManager.getInstance().isKeyPressed('ArrowDown')) {
            this.parent.gotoState((this.parent as DinoFSMSystem).runningState)
        }
    }
}

class DeadState extends FSMState {
    public override onEnter(): void {
        (<Dino> this.parent.Parent).dinoAnimator.play('Dead')
        ;(<Dino> this.parent.Parent).isUpdated = false
    }

    public override onExit(): void {
        (<Dino> this.parent.Parent).isUpdated = true
    }

    public override onUpdate(deltaTime: number): void {
        if (InputManager.getInstance().isKeyPressed(' ')) {
            this.parent.gotoState((this.parent as DinoFSMSystem).readyState)
        }
    }
}

class ReadyState extends FSMState {
    public override onEnter(): void {
        (<Dino> this.parent.Parent).dinoAnimator.play('Idle')
        ;(<Dino> this.parent.Parent).isUpdated = false
    }

    public override onExit(): void {
        (<Dino> this.parent.Parent).isUpdated = true
    }

    public override onUpdate(deltaTime: number): void {
        if (InputManager.getInstance().isKeyPressed(' ')) {
            this.parent.gotoState((this.parent as DinoFSMSystem).runningState)
        }
    }
}

export { Dino }
