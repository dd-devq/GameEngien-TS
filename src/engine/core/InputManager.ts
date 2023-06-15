import { RenderContext } from '../Engine'
import { Logger } from '../utils/Logger'
class InputManager {
    private static instance: InputManager
    private keyState: { [key: string]: boolean } = {}
    private keyHoldState: { [key: string]: boolean } = {}
    private isClicked = false
    private isHover = false
    constructor() {
        document.addEventListener('keyup', this.handleKeyUp.bind(this))
        document.addEventListener('keydown', this.handleKeyDown.bind(this))
        document.addEventListener('mousemove', this.handleMouseMove.bind(this))
        document.addEventListener('mousedown', this.handleMouseDown.bind(this))
        document.addEventListener('mouseup', this.handleMouseUp.bind(this))

        InputManager.instance = this
        Logger.info('Input Manager Initialized!')
    }

    public handleMouseMove(event: MouseEvent): void {
        const rect = RenderContext.canvas.getBoundingClientRect()
        const mouseX = event.clientX
        const mouseY = event.clientY

        this.isHover =
            mouseY > rect.top && mouseY < rect.bottom && mouseX > rect.left && mouseX < rect.right
    }

    public handleMouseDown(event: MouseEvent): void {
        if (this.isHover) {
            this.isClicked = true
        }
    }

    public handleMouseUp(event: MouseEvent): void {
        this.isClicked = false
    }

    public isMouseClicked(): boolean {
        return this.isClicked
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
