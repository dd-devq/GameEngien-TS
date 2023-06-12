import { Renderer } from '../graphic/Renderer'
import { Component } from './Component'
import { FSMState } from './FSMState'

class FSMSystem extends Component {
    public states: FSMState[]
    public currentState: FSMState

    constructor(gameObject: IRenderable) {
        super(gameObject)
        this.states = []
        this.isDrawable = false
    }
    public addState(state: FSMState): void {
        this.states.push(state)
        if (this.states.length == 1) {
            this.currentState = state
            this.currentState.onEnter()
        }
    }

    public gotoState(state: FSMState): void {
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
            // Draws
        }
    }
}

export { FSMSystem }
