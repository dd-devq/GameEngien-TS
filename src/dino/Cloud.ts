import { GameObject, Renderer, Vector2, Sprite } from '../engine/Engine'
import * as Util from '../engine/utils/UUID'
class Cloud extends GameObject {
    private nowRenderingResource: IRenderResource
    public accelaration: number
    public speed: number

    public imageOffset: Vector2
    public isIncanvas: boolean
    readonly MAX_SPEED: number = 15
    readonly DEFAULT_SPEED: number = 1.5
    readonly DEFAULT_POSTION: Vector2 = new Vector2(0, 0)

    readonly MAX_HEIGHT = 100
    readonly MIN_HEIGHT = -50
    readonly MAX_DISTANCE = 500
    readonly MIN_DISTANCE = 400

    constructor(name: string, position?: Vector2) {
        super(name, position)
        this.accelaration = 2.5
        this.speed = this.DEFAULT_SPEED
        this.isIncanvas = false
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
        console.log(this.position)

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

        if (!this.isIncanvas) {
            this.respawn()
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
        const y = Util.getRandomInRange(this.MIN_HEIGHT, this.MAX_HEIGHT)
        const x =
            this.DEFAULT_POSTION.x + Util.getRandomInRange(this.MIN_DISTANCE, this.MAX_DISTANCE)
        this.position.equal(new Vector2(x, y))
    }
}

export { Cloud }
