abstract class FSMState {
    public abstract onEnter(): void

    public abstract onUpdate(): void

    public abstract onExit(): void
}

export { FSMState }
