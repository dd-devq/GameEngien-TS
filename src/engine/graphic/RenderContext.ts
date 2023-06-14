import { Vector2 } from '../Engine'
import { Logger } from '../utils/Logger'

class RenderContext {
    public static canvas: HTMLCanvasElement
    public static canvasContext: CanvasRenderingContext2D
    private height: number
    private width: number

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
    }

    public init(): boolean {
        /* Canvas Initialization*/
        const game = document.getElementById('game')
        if (game == null) {
            Logger.error('Game Element Not Found')
            return false
        }

        RenderContext.canvas = document.createElement('canvas')

        /* Canvas Settings */
        RenderContext.canvas.id = 'canvas'
        RenderContext.canvas.height = this.height
        RenderContext.canvas.width = this.width

        /* Centering Canvas */
        RenderContext.canvas.setAttribute('style', 'margin: auto; position: fixed')

        game.appendChild(RenderContext.canvas)

        /* Canvas Context Initialization*/
        const renderContext = RenderContext.canvas.getContext('2d')

        if (renderContext !== null) {
            RenderContext.canvasContext = renderContext
        } else {
            Logger.error('Canvas Not Found')
            return false
        }
        Logger.info('Render Context Initialized!')
        return true
    }

    public clearContext(): void {
        RenderContext.canvasContext.clearRect(0, 0, this.width, this.height)
    }

    public drawCanvasContextArea(): void {
        RenderContext.canvasContext.fillStyle = '#f7f7f7'
        RenderContext.canvasContext.fillRect(0, 0, this.width, this.height)
    }

    public toWorldPosition(position: Vector2): Vector2 {
        return new Vector2(position.x + this.width / 2, -position.y + this.height / 2)
    }

    public isInCanvas(position: Vector2, offset: Vector2): boolean {
        const worldPosition = this.toWorldPosition(position)
        if (worldPosition.x + offset.x < 0 || worldPosition.y + offset.y > this.height) {
            return false
        }
        return true
    }

    public getCanvasHeight(): number {
        return this.height
    }

    public getCanvasWidth(): number {
        return this.width
    }
}

export { RenderContext }
