import { GameObject, Logger } from '../engine/Engine'
import { Renderer } from '../engine/graphic/Renderer'
import { Dino } from './Dino'
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

    constructor(dino: Dino) {
        super('Dino Game Manager')
        this.dino = dino
        this.gameState = gameState.READY
    }

    public override update(deltaTime: number): void {
        switch (this.gameState) {
            case gameState.READY: {
                break
            }
            case gameState.GAMEPLAY: {
                break
            }
            case gameState.GAMEOVER: {
                break
            }
            default: {
                Logger.warn('Unknow Game State!')
                break
            }
        }
    }

    public override render(renderer: Renderer): void {}
}

export { GameManager }
