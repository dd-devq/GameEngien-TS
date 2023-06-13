import { Logger } from '../utils/Logger'
class InputManager {
    private static instance: InputManager
    private keyState: { [key: string]: boolean } = {}
    private keyHoldState: { [key: string]: boolean } = {}

    constructor() {
        document.addEventListener('keyup', this.handleKeyUp.bind(this))
        document.addEventListener('keydown', this.handleKeyDown.bind(this))
        InputManager.instance = this
        Logger.info('Input Manager Initialized!')
    }

    public reset(): void {
        this.keyState = {}
    }

    private handleKeyUp(event: KeyboardEvent): void {
        const key = event.key
        this.keyState[key] = false
        this.keyHoldState[key] = false
    }

    private handleKeyDown(event: KeyboardEvent): void {
        const key = event.key
        this.keyState[key] = true
        if (this.keyHoldState[key] == false) {
            this.keyHoldState[key] = true
        }
    }

    public isKeyPressed(key: string): boolean {
        return this.keyState[key]
    }

    public isKeyHeld(key: string): boolean {
        return this.keyHoldState[key]
    }

    public static getInstance(): InputManager {
        if (!InputManager.instance) {
            InputManager.instance = new InputManager()
        }
        return InputManager.instance
    }
}

export { InputManager }
