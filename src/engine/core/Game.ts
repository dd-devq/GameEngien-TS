import { Scene } from './Scene'
import { Renderer } from '../graphic/Renderer'
import { InputManager } from './InputManager'
import { Logger } from '../utils/Logger'
import { Timer } from '../Engine'
import { ResourceManager } from '../Engine'

class Game {
    public sceneMap: Map<string, Scene>
    public nowActiveScene: Scene
    public renderer: Renderer
    public resourceManager: ResourceManager

    private timeScale: number
    private deltaTime: number
    private fps: number

    constructor() {
        this.sceneMap = new Map<string, Scene>()
    }

    public init(gameConfig: GameConfig, renderConfig: RendererConfig): boolean {
        this.renderer = new Renderer(renderConfig)
        this.resourceManager = new ResourceManager()

        this.timeScale = gameConfig.timeScale
        this.deltaTime = gameConfig.deltaTime
        this.fps = gameConfig.fps

        requestAnimationFrame(this.gameLoop)
        return true
    }

    public gameLoop = (): void => {
        Timer.start()

        this.processInput()
        this.update()
        this.render()

        Timer.end()
        this.deltaTime = Timer.getDeltaTime()
        InputManager.reset()
        requestAnimationFrame(this.gameLoop.bind(this))
    }

    public addScene(scene: Scene): void {
        if (!this.sceneMap.has(scene.name)) {
            this.sceneMap.set(scene.name, scene)
            this.setActiveScene(scene.name)
            return
        }
        Logger.error('Duplicate Scene!')
    }

    public setActiveScene(name: string): void {
        if (this.sceneMap.has(name)) {
            this.nowActiveScene = this.sceneMap.get(name)!
        }
    }

    public getActiveScene(): Scene {
        return this.nowActiveScene
    }

    protected processInput(): void {
        InputManager.handleInput()
    }

    protected update(): void {
        if (this.nowActiveScene == null) {
            Logger.warn('No Active Scene!')
            return
        }

        this.nowActiveScene.update(this.timeScale, this.deltaTime)
    }

    protected render(): void {
        this.renderer.clear()
        if (this.nowActiveScene == null) {
            Logger.warn('No Active Scene!')
            return
        }
        this.nowActiveScene.render(this.renderer)
    }
}

export { Game }
