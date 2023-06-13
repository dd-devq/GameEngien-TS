import { Scene } from './Scene'
import { Renderer } from '../graphic/Renderer'
import { InputManager } from './InputManager'
import { Logger } from '../utils/Logger'
import { Timer } from '../Engine'
import { ResourceManager } from '../Engine'

class Game {
    public sceneMap: Map<string, Scene> = new Map<string, Scene>()
    public nowActiveScene: Scene
    public renderer: Renderer
    public resourceManager: ResourceManager
    public inputManager: InputManager

    private deltaTime = 0

    public initGame(renderConfig: RendererConfig): void {
        this.renderer = new Renderer(renderConfig)
        this.resourceManager = new ResourceManager()
        this.inputManager = new InputManager()
    }

    public gameLoop(): void {
        Timer.start()

        this.update()
        this.render()

        Timer.end()

        this.deltaTime = Timer.getDeltaTime()
        this.inputManager.reset()

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
