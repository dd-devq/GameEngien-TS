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

    private deltaTime: number
    private fps: number

    constructor() {
        this.sceneMap = new Map<string, Scene>()
        const defaultScene = new Scene('Default')
        this.addScene(defaultScene)
    }

    public init(gameConfig: GameConfig, renderConfig: RendererConfig): boolean {
        this.renderer = new Renderer(renderConfig)
        this.resourceManager = new ResourceManager()

        this.deltaTime = gameConfig.deltaTime
        this.fps = gameConfig.fps

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
        const scene = this.sceneMap.get(name)
        if (scene !== undefined) {
            this.nowActiveScene = scene
        } else {
            Logger.warn('Unknown Scene!')
        }
    }

    public getActiveScene(): Scene {
        return this.nowActiveScene
    }

    protected processInput(): void {
        InputManager.handleInput()
    }

    protected update(): void {
        if (this.nowActiveScene === null) {
            Logger.warn('No Active Scene!')
            return
        }
        this.nowActiveScene.update(this.deltaTime)
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
