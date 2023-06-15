import { GameObject, Renderer, Vector2, Sprite } from '../engine/Engine'

export class ReplayButton extends GameObject {
    private nowRenderingResource: IRenderResource
    public width: number
    public height: number

    constructor(name: string, position?: Vector2) {
        super(name, position)
        this.isActive = false
    }

    public loadResource(sprite: IRenderResource) {
        this.nowRenderingResource = sprite
        const imageSize = new Vector2(
            (this.nowRenderingResource as Sprite).image.width,
            (this.nowRenderingResource as Sprite).image.height
        )
        this.width = imageSize.x
        this.height = imageSize.y
    }

    public override render(renderer: Renderer): void {
        super.render(renderer)
        if (this.isActive) {
            renderer.drawSprite(this.nowRenderingResource as Sprite, this.position)
        }
    }

    public override update(deltaTime: number): void {
        if (this.isUpdated) {
            super.update(deltaTime)
        }
    }
}
