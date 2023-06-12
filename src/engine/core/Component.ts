import { generateUUID } from '../utils/UUID'
import { Renderer, Logger } from '../Engine'

abstract class Component implements IRenderResource {
    public uuid: string
    protected isActive: boolean
    protected isDrawable: boolean
    protected parent: IRenderable

    set Parent(gameObject: IRenderable) {
        this.parent = gameObject
    }

    get Parent(): IRenderable {
        return this.parent
    }

    constructor(gameObejct: IRenderable) {
        this.uuid = generateUUID(8)
        this.parent = gameObejct
        this.isActive = true
        this.isDrawable = true
    }

    public abstract update(deltaTime: number): void

    public abstract render(renderer: Renderer): void

    public setActive(isActive: boolean): void {
        this.isActive = isActive
        isActive ? this.onEnabled() : this.onDisabled()
    }

    public onEnabled(): void {
        Logger.info(`Component: ${this.uuid} is enabled!`)
    }

    public onDisabled(): void {
        Logger.info(`Component: ${this.uuid} is disabled!`)
    }
}

export { Component }
