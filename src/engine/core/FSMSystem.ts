import { Logger } from '../Engine'
import { Renderer } from '../graphic/Renderer'
import { Component } from './Component'
import { FSMState } from './FSMState'

class FSMSystem<T> extends Component {
    public states: FSMState<T>[]
    public currentState: FSMState<T>

    constructor(gameObject: IRenderable) {
        super(gameObject)
        this.states = []
        this.isDrawable = false
    }
    public addState(state: FSMState<T>): void {
        this.states.push(state)
        if (this.states.length == 1) {
            this.currentState = state
            this.currentState.onEnter()
        }
    }

    public gotoState(state: FSMState<T>): void {
        if (this.currentState !== undefined) {
            this.currentState.onExit()
        }
        this.currentState = state
        this.currentState.onEnter()
    }

    public override update(deltaTime: number): void {
        if (this.currentState !== undefined) {
            this.currentState.onUpdate(deltaTime)
        }
    }
    public override render(renderer: Renderer): void {
        if (this.isDrawable) {
            Logger.warn('FSMSystem is not drawable!')
        }
    }
}

export { FSMSystem }
