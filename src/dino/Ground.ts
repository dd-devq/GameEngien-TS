import { Position } from '../engine/Engine'
import { GameObject } from '../engine/Engine'
import { Renderer } from '../engine/graphic/Renderer'
import { Sprite } from '../engine/Engine'
class Ground extends GameObject {
    private nowRenderingResource: IRenderResource
    public accelaration: number
    public speed: number
    private imageOffset: Position
    readonly MAX_SPEED: number
    readonly DEFAULT_POSTION: Position = new Position(0, 0)

    constructor(name: string, position?: Position) {
        super(name, position)
        this.accelaration = 2.5
        this.speed = 5
        this.MAX_SPEED = 100
        if (position != undefined) {
            this.DEFAULT_POSTION.x = position.x
            this.DEFAULT_POSTION.y = position.y
        }
    }

    public loadResource(sprite: IRenderResource) {
        this.nowRenderingResource = sprite
        this.imageOffset = new Position(
            (this.nowRenderingResource as Sprite).image.width,
            (this.nowRenderingResource as Sprite).image.height
        )
    }
    public override render(renderer: Renderer): void {
        if (this.isActive && renderer.renderContext.isInCanvas(this.position, this.imageOffset)) {
            renderer.drawSprite(this.nowRenderingResource as Sprite, this.position)
        }
    }

    public override update(deltaTime: number): void {
        this.increaseSpeed(deltaTime)
        console.log(this.speed)
        this.position.x -= this.speed
    }

    public increaseSpeed(deltaTime: number): void {
        this.speed -= deltaTime * this.accelaration
    }
}

export { Ground }
