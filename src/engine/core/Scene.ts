import { Logger } from '../utils/Logger'
import { GameObject } from './GameObject'
import { Renderer } from '../graphic/Renderer'

class Scene {
    public name: string
    public gameObejctMap: Map<string, GameObject>

    constructor(name: string) {
        this.name = name
        this.gameObejctMap = new Map<string, GameObject>()
    }

    public addGameObject(gameObject: GameObject): void {
        if (this.gameObejctMap.has(gameObject.name)) {
            Logger.warn('Game Object already exists!')
            return
        }
        this.gameObejctMap.set(gameObject.name, gameObject)
    }

    public update(deltaTime: number): void {
        for (const [name, gameObject] of this.gameObejctMap) {
            gameObject.update(deltaTime)
        }
    }

    public render(renderer: Renderer): void {
        for (const [name, gameObject] of this.gameObejctMap) {
            gameObject.render(renderer)
        }
    }
}

export { Scene }
