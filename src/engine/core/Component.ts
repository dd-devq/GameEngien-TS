import { Position } from '../utils/Math'
import { generateUUID } from '../utils/UUID'
import { Renderer } from '../graphic/Renderer'

class Component implements IRenderResource {
    public uuid: string
    public localPosition: Position
    protected isActive: boolean

    constructor(position?: Position) {
        if (position == null) {
            this.localPosition = new Position(0, 0)
        } else {
            this.localPosition = position
        }
        this.uuid = generateUUID(8)
    }

    public start(): void {
        //
    }

    public update(deltaTime: number): void {
        if (this.isActive) {
            //
        }
    }

    public render(renderer: Renderer): void {
        //
    }

    public setActive(isActive: boolean): void {
        this.isActive = isActive
        isActive ? this.onEnabled() : this.onDisabled()
    }

    public onEnabled(): void {
        //
    }

    public onDisabled(): void {
        //
    }

    public reset(): void {
        this.localPosition.x = 0
        this.localPosition.y = 0
    }
}

export { Component }
