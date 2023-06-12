import { Renderer, InputManager, Vector2, GameObject, Logger } from '../engine/Engine'

import { Dino } from './Dino'
import { Ground } from './Ground'
import { ObjectPool } from './ObjectPool'

enum gameState {
    READY = 0,
    GAMEPLAY = 1,
    GAMEOVER = 2,
}

class GameManager extends GameObject {
    public gameState: gameState
    public objectPool: ObjectPool
    public dino: Dino
    public ground1: Ground
    public ground2: Ground
    public inputManager: InputManager

    constructor(name: string) {
        super(name)
        this.gameState = gameState.READY
    }

    public override update(deltaTime: number): void {
        switch (this.gameState) {
            case gameState.READY: {
                this.updateReady(deltaTime)
                break
            }
            case gameState.GAMEPLAY: {
                this.updateGameplay(deltaTime)
                break
            }
            case gameState.GAMEOVER: {
                this.updateGameover(deltaTime)
                break
            }
            default: {
                Logger.warn('Unknow Game State!')
                break
            }
        }
    }

    public updateGameplay(deltaTime: number): void {
        if (InputManager.getInstance().isKeyPressed('d')) {
            this.gameState = gameState.GAMEOVER
            this.ground1.isUpdated = false
            this.ground2.isUpdated = false
        }

        if (!this.ground1.isIncanvas) {
            this.ground1.setPosition(
                new Vector2(
                    this.ground2.position.x + this.ground1.imageOffset.x,
                    this.ground1.position.y
                )
            )
        }
        if (!this.ground2.isIncanvas) {
            this.ground2.setPosition(
                new Vector2(
                    this.ground1.position.x + this.ground2.imageOffset.x,
                    this.ground2.position.y
                )
            )
        }
    }

    public updateReady(deltaTime: number): void {
        if (InputManager.getInstance().isKeyPressed(' ')) {
            this.gameState = gameState.GAMEPLAY
            Logger.info('Start Gameplay')
            this.ground1.isUpdated = true
            this.ground2.isUpdated = true
            this.dino.isUpdated = true
        }
    }

    public updateGameover(deltaTime: number): void {
        if (InputManager.getInstance().isKeyPressed(' ')) {
            this.ground1.reset()
            this.ground2.reset()
            this.gameState = gameState.READY
        }
    }
    public override render(renderer: Renderer): void {
        //
    }
}

export { GameManager }
