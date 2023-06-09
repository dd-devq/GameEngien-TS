import { RenderContext } from './RenderContext'
import { Logger } from '../utils/Logger'

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
}

export { Renderer }
