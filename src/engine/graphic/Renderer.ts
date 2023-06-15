import { RenderContext } from './RenderContext'
import { Logger } from '../utils/Logger'
import { Vector2, Sprite } from '../Engine'

class Renderer {
    public renderContext: RenderContext

    constructor(config: RendererConfig) {
        this.renderContext = new RenderContext(config.width, config.height)

        if (!this.renderContext.init()) {
            Logger.error('Canvas Rendering Context Not Found')
        }
        Logger.info('Renderer Initialized!')
    }

    public clear() {
        this.renderContext.clearContext()
        this.renderContext.drawCanvasContextArea()
    }

    public drawSprite(sprite: Sprite, position: Vector2) {
        const worldPosition = this.renderContext.toWorldPosition(position)
        RenderContext.canvasContext.drawImage(sprite.image, worldPosition.x, worldPosition.y)
    }

    public drawRect(position: Vector2, width: number, height: number) {
        const worldPosition = this.renderContext.toWorldPosition(position)
        RenderContext.canvasContext.beginPath()
        RenderContext.canvasContext.lineWidth = 0.5
        RenderContext.canvasContext.strokeStyle = 'green'
        RenderContext.canvasContext.rect(worldPosition.x, worldPosition.y, width, height)
        RenderContext.canvasContext.stroke()
    }

    public drawText(text: string, position: Vector2) {
        const worldPosition = this.renderContext.toWorldPosition(position)
        RenderContext.canvasContext.font = '24px Roboto'
        RenderContext.canvasContext.strokeStyle = 'black'
        RenderContext.canvasContext.strokeText(text, worldPosition.x, worldPosition.y)
    }
}

export { Renderer }
