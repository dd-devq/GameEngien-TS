import { FSMSystem } from './FSMSystem'

abstract class FSMState {
    public parent: FSMSystem

    public abstract onEnter(): void

    public abstract onUpdate(deltaTime: number): void

    public abstract onExit(): void
}

export { FSMState }
