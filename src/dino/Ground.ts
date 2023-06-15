import { Sprite, GameObject, Renderer, Vector2 } from '../engine/Engine'

class Ground extends GameObject {
    private nowRenderingResource: IRenderResource
    public accelaration: number
    public speed: number

    public imageOffset: Vector2
    public isIncanvas: boolean
    readonly MAX_SPEED: number = 15
    readonly DEFAULT_SPEED: number = 2.25
    readonly DEFAULT_POSTION: Vector2 = new Vector2(0, 0)

    constructor(name: string, position?: Vector2) {
        super(name, position)
        this.accelaration = 2.5
        this.speed = this.DEFAULT_SPEED
        this.isIncanvas = true
        if (position !== undefined) {
            this.DEFAULT_POSTION.x = position.x
            this.DEFAULT_POSTION.y = position.y
        }
    }

    public loadResource(sprite: IRenderResource) {
        this.nowRenderingResource = sprite
        this.imageOffset = new Vector2(
            (this.nowRenderingResource as Sprite).image.width,
            (this.nowRenderingResource as Sprite).image.height
        )
    }
    public override render(renderer: Renderer): void {
        this.isIncanvas = renderer.renderContext.isInCanvas(this.position, this.imageOffset)
        if (this.isActive && this.isIncanvas) {
            renderer.drawSprite(this.nowRenderingResource as Sprite, this.position)
        }
        super.render(renderer)
    }

    public override update(deltaTime: number): void {
        if (this.isUpdated) {
            this.increaseSpeed(deltaTime)
            this.position.x -= this.speed
        }
    }

    public increaseSpeed(deltaTime: number): void {
        if (this.speed <= this.MAX_SPEED) {
            this.speed += deltaTime * this.accelaration
        } else {
            this.speed = this.MAX_SPEED
        }
    }
    public override reset(): void {
        this.isUpdated = false
        this.position.equal(this.DEFAULT_POSTION)
        this.speed = this.DEFAULT_SPEED
    }

    public respawn(): void {
        this.position.equal(this.DEFAULT_POSTION)
    }
}

export { Ground }
