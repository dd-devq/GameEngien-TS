import { Position } from '../utils/Math'
import { Component } from './Component'
import { Logger } from '../utils/Logger'
import { Renderer } from '../graphic/Renderer'

class GameObject implements IRenderable {
    public name: string
    public position: Position
    public componentMap: Map<string, Component>
    protected isActive: boolean
    public isUpdated: boolean

    constructor(name: string, position?: Position) {
        if (position == null) {
            this.position = new Position(0, 0)
        } else {
            this.position = position
        }

        this.name = name
        this.componentMap = new Map<string, Component>()
        this.isActive = true
        this.isUpdated = false
    }

    public start(): void {
        //
    }

    public update(deltaTime: number): void {
        if (this.isActive) {
            for (const [uuid, component] of this.componentMap) {
                component.update(deltaTime)
            }
        }
    }

    public render(renderer: Renderer): void {
        if (this.isActive) {
            for (const [uuid, component] of this.componentMap) {
                component.render(renderer)
            }
        }
    }

    public addComponent(component: Component) {
        if (this.componentMap.has(component.uuid)) {
            Logger.error('Component is already added!')
            return
        }
        this.componentMap.set(component.uuid, component)
    }

    public setActive(isActive: boolean): void {
        this.isActive = isActive
        for (const [uuid, component] of this.componentMap) {
            component.setActive(isActive)
        }

        isActive ? this.onEnabled() : this.onDisabled()
    }

    public onEnabled(): void {
        //
    }

    public onDisabled(): void {
        //
    }

    public reset(): void {
        this.position.x = 0
        this.position.y = 0
    }

    public setPosition(position: Position): void {
        this.position.x = position.x
        this.position.y = position.y
    }
}

export { GameObject }
