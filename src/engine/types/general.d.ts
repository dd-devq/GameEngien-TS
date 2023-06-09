interface IRenderable {
    name: string
    position: Position
}

interface IRenderResource {}

interface RendererConfig {
    width: number
    height: number
}

interface GameConfig {
    timeScale: number
    deltaTime: number
    fps: number
}
