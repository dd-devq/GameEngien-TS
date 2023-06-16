abstract class FSMState<T> {
    public parent: T

    public abstract onEnter(): void

    public abstract onUpdate(deltaTime: number): void

    public abstract onExit(): void
}

export { FSMState }
