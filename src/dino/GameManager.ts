import {
    Renderer,
    InputManager,
    Vector2,
    GameObject,
    Logger,
    ResourceManager,
} from '../engine/Engine'
import { Bird } from './Bird'
import { Cactus } from './Cactus'
import { Cloud } from './Cloud'

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
    public cactusPool: ObjectPool<Cactus>
    public birdPool: ObjectPool<Bird>
    public clouds: Cloud[] = []
    public dino: Dino
    public ground1: Ground
    public ground2: Ground
    public inputManager: InputManager
    public resourceManager: ResourceManager

    constructor(name: string) {
        super(name)
        this.gameState = gameState.READY
    }

    public override update(deltaTime: number): void {
        switch (this.gameState) {
            case gameState.READY: {
                if (InputManager.getInstance().isKeyPressed(' ')) {
                    this.gameState = gameState.GAMEPLAY
                    this.ground1.isUpdated = true
                    this.ground2.isUpdated = true
                    for (const cloud of this.clouds) {
                        cloud.isUpdated = true
                    }
                    this.dino.isUpdated = true
                }

                break
            }
            case gameState.GAMEPLAY: {
                this.updateGameplay(deltaTime)
                break
            }
            case gameState.GAMEOVER: {
                this.ground1.reset()
                this.ground2.reset()
                for (const cloud of this.clouds) {
                    cloud.reset()
                }

                this.gameState = gameState.READY
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
            this.ground1.isUpdated = false
            this.ground2.isUpdated = false
            for (const cloud of this.clouds) {
                cloud.isUpdated = false
            }
        }
        if (InputManager.getInstance().isKeyPressed('a')) {
            this.gameState = gameState.GAMEOVER
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
