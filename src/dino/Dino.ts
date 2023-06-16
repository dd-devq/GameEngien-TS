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
    // Crate -> Init -> Update
    // Reduce IREnderResource
    public boxCollider: BoxCollider
    public rigidBody: RigidBody
    public nowRenderingResource: IRenderResource | undefined
    public dinoAnimator: SpriteAnimator
    public dinoFSMSystem: DinoFSMSystem
    public DEFAULT_POSITION: Vector2 = new Vector2()
    public maxHeight = 25
    public isDead = false

    constructor(name: string, position?: Vector2) {
        super(name, position)
        if (position !== undefined) {
            this.DEFAULT_POSITION.equal(position)
            this.rigidBody = new RigidBody(this, 1)
        }
    }

    public init(): void {
        this.boxCollider = new BoxCollider(this, 40, 50)
        this.boxCollider.showCollider = true
        this.addComponent(this.boxCollider)

        this.nowRenderingResource = new Sprite(this, 'assets\\Dino\\dinoIdle.png')
        this.addComponent(this.rigidBody)
        this.dinoFSMSystem = new DinoFSMSystem(this)
        this.addComponent(this.dinoFSMSystem)
    }

    public override update(deltaTime: number): void {
        if (this.isUpdated) {
            super.update(deltaTime)
        }
        if (this.isDead) {
            this.dinoFSMSystem.update(deltaTime)
        }
        this.nowRenderingResource = this.dinoAnimator.getCurrentFrame()
    }

    public override render(renderer: Renderer): void {
        // check if Sprite
        if (this.isActive && this.nowRenderingResource instanceof Sprite) {
            renderer.drawSprite(this.nowRenderingResource, this.position)
        }
        // super.render(renderer)
    }

    public override reset(): void {
        this.isUpdated = false
        this.position.equal(this.DEFAULT_POSITION)
        this.nowRenderingResource = this.dinoAnimator.getCurrentFrame()
    }
}

//Generic Type
//Type Casting for outside data
// override DinoFSMSystem
// Reduce Type Casting
class DinoFSMSystem extends FSMSystem<DinoFSMSystem> {
    protected parent: Dino
    public readyState: ReadyState
    public jumpingState: JumpingState
    public deadState: DeadState
    public crouchingState: CrouchingState
    public runningState: RunningState

    set Parent(gameObject: Dino) {
        this.parent = gameObject
    }

    get Parent(): Dino {
        return this.parent
    }

    constructor(dino: Dino) {
        super(dino)
        this.readyState = new ReadyState()
        this.jumpingState = new JumpingState()
        this.deadState = new DeadState()
        this.crouchingState = new CrouchingState()
        this.runningState = new RunningState()

        this.readyState.parent = this
        this.jumpingState.parent = this
        this.deadState.parent = this
        this.crouchingState.parent = this
        this.runningState.parent = this

        this.addState(this.readyState)
        this.addState(this.jumpingState)
        this.addState(this.deadState)
        this.addState(this.crouchingState)
        this.addState(this.runningState)
    }
}

// No same name var

class JumpingState extends FSMState<DinoFSMSystem> {
    public jumpInProgress: boolean
    public falling: boolean
    public jumpForce = 105

    public override onEnter(): void {
        this.falling = false
        this.jumpInProgress = true
        this.parent.Parent.dinoAnimator.play('Jump')
        this.parent.Parent.rigidBody.resetVelocity()
        this.parent.Parent.rigidBody.isSimulated = true
        this.jump()
    }

    public override onExit(): void {
        this.jumpInProgress = false
        this.falling = false
        this.parent.Parent.rigidBody.resetVelocity()
        this.parent.Parent.rigidBody.isSimulated = false
        this.parent.Parent.rigidBody.G = -9.8
    }

    public override onUpdate(deltaTime: number): void {
        if (this.jumpInProgress) {
            if (InputManager.getInstance().isKeyPressed('ArrowDown')) {
                this.parent.Parent.rigidBody.G *= 5
                this.falling = true
            }
        }

        if (this.jumpInProgress && !this.falling) {
            if (this.parent.Parent.position.y >= this.parent.Parent.maxHeight) {
                this.falling = true
            }
        } else {
            if (this.parent.Parent.position.y <= this.parent.Parent.DEFAULT_POSITION.y) {
                this.parent.Parent.position.equal(this.parent.Parent.DEFAULT_POSITION)
                this.parent.gotoState((this.parent as DinoFSMSystem).runningState)
            }
        }
        if (this.parent.Parent.isDead) {
            this.parent.gotoState((this.parent as DinoFSMSystem).deadState)
        }
    }

    public jump(): void {
        (this.parent.Parent as Dino).rigidBody.applyForce(new Vector2(0, this.jumpForce))
    }
}

class RunningState extends FSMState<DinoFSMSystem> {
    public override onEnter(): void {
        this.parent.Parent.dinoAnimator.play('Run')
    }
    public override onExit(): void {
        //
    }

    public override onUpdate(deltaTime: number): void {
        if (this.parent.Parent.position.y <= this.parent.Parent.DEFAULT_POSITION.y) {
            this.parent.Parent.position.equal(this.parent.Parent.DEFAULT_POSITION)
        }

        if (InputManager.getInstance().isKeyPressed('ArrowDown')) {
            this.parent.gotoState((this.parent as DinoFSMSystem).crouchingState)
        } else if (InputManager.getInstance().isKeyHeld('ArrowDown')) {
            this.parent.gotoState((this.parent as DinoFSMSystem).crouchingState)
        } else if (
            InputManager.getInstance().isKeyPressed(' ') ||
            InputManager.getInstance().isKeyHeld(' ')
        ) {
            this.parent.gotoState((this.parent as DinoFSMSystem).jumpingState)
        }
        if (this.parent.Parent.isDead) {
            this.parent.gotoState((this.parent as DinoFSMSystem).deadState)
        }
    }
}

// Obejct Anchor
class CrouchingState extends FSMState<DinoFSMSystem> {
    public crouchOffset = 20
    public override onEnter(): void {
        this.parent.Parent.dinoAnimator.play('Crouch')
        this.parent.Parent.DEFAULT_POSITION.y -= this.crouchOffset
        this.parent.Parent.position.equal(this.parent.Parent.DEFAULT_POSITION)
    }

    public override onExit(): void {
        this.parent.Parent.DEFAULT_POSITION.y += this.crouchOffset
        this.parent.Parent.position.y = this.parent.Parent.DEFAULT_POSITION.y
    }

    public override onUpdate(deltaTime: number): void {
        if (this.parent.Parent.position.y <= this.parent.Parent.DEFAULT_POSITION.y) {
            this.parent.Parent.position.equal(this.parent.Parent.DEFAULT_POSITION)
        }
        if (
            InputManager.getInstance().isKeyPressed('ArrowDown') ||
            InputManager.getInstance().isKeyHeld('ArrowDown')
        ) {
            this.parent.gotoState((this.parent as DinoFSMSystem).crouchingState)
        } else {
            this.parent.gotoState((this.parent as DinoFSMSystem).runningState)
        }
        if (this.parent.Parent.isDead) {
            this.parent.gotoState((this.parent as DinoFSMSystem).deadState)
        }
    }
}

class DeadState extends FSMState<DinoFSMSystem> {
    public override onEnter(): void {
        this.parent.Parent.dinoAnimator.play('Dead')
        this.parent.Parent.isUpdated = false
    }

    public override onExit(): void {
        this.parent.Parent.isDead = false
    }

    public override onUpdate(deltaTime: number): void {
        if (
            InputManager.getInstance().isKeyPressed(' ') ||
            InputManager.getInstance().isMouseClicked()
        ) {
            this.parent.gotoState((this.parent as DinoFSMSystem).readyState)
        }
    }
}

class ReadyState extends FSMState<DinoFSMSystem> {
    public override onEnter(): void {
        this.parent.Parent.dinoAnimator.play('Idle')
        this.parent.Parent.reset()
    }

    public override onExit(): void {
        this.parent.Parent.isUpdated = true
    }

    public override onUpdate(deltaTime: number): void {
        if (InputManager.getInstance().isKeyPressed(' ')) {
            this.parent.gotoState((this.parent as DinoFSMSystem).runningState)
        }
    }
}

export { Dino }
