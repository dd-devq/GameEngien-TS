import { RenderContext } from './RenderContext'
import { Logger } from '../utils/Logger'
import { Position, Sprite } from '../Engine'

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

    public drawSprite(sprite: Sprite, position: Position) {
        const worldPosition = this.renderContext.toWorldPosition(position)
        RenderContext.canvasContext.drawImage(sprite.image, worldPosition.x, worldPosition.y)
    }
}

export { Renderer }
