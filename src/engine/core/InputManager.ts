import { Logger } from '../utils/Logger'
class InputManager {
    private static instance: InputManager
    private keyState: { [key: string]: boolean } = {}

    constructor() {
        document.addEventListener('keyup', this.handleKeyUp.bind(this))
        document.addEventListener('keydown', this.handleKeyDown.bind(this))

        Logger.info('Input Manager Initialized!')
    }

    public reset(): void {
        this.keyState = {}
    }

    private handleKeyUp(event: KeyboardEvent): void {
        const key = event.key
        this.keyState[key] = false
    }

    private handleKeyDown(event: KeyboardEvent): void {
        const key = event.key
        this.keyState[key] = true
    }

    public isKeyPressed(key: string): boolean {
        return this.keyState[key]
    }

    public static getInstance(): InputManager {
        if (!InputManager.instance) {
            InputManager.instance = new InputManager()
        }
        return InputManager.instance
    }
}

export { InputManager }
