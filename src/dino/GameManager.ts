import {
    Renderer,
    InputManager,
    Vector2,
    GameObject,
    Logger,
    ResourceManager,
    Sprite,
} from '../engine/Engine'
import { getRandomInRange } from '../engine/utils/UUID'
import { Cactus } from './Cactus'
import { Cloud } from './Cloud'
import { Bird } from './Bird'
import { Dino } from './Dino'
import { Ground } from './Ground'

enum gameState {
    READY = 0,
    GAMEPLAY = 1,
    GAMEOVER = 2,
}

class GameManager extends GameObject {
    public gameState: gameState
    public clouds: Cloud[] = []
    public dino: Dino
    public ground1: Ground
    public ground2: Ground
    public inputManager: InputManager
    public resourceManager: ResourceManager
    public currentObstacle: IRenderable[] = []
    public enemy: Bird

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
                    for (const obstacle of this.currentObstacle) {
                        (<GameObject>obstacle).isUpdated = true
                    }

                    this.dino.isUpdated = true
                    this.enemy.isUpdated = true
                }

                break
            }
            case gameState.GAMEPLAY: {
                this.updateGameplay(deltaTime)
                break
            }
            case gameState.GAMEOVER: {
                if (InputManager.getInstance().isKeyPressed(' ')) {
                    this.ground1.reset()
                    this.ground2.reset()
                    for (const cloud of this.clouds) {
                        cloud.reset()
                    }

                    for (const obstacle of this.currentObstacle) {
                        (<GameObject>obstacle).reset()
                    }

                    this.gameState = gameState.READY
                    this.enemy.reset()
                }
                break
            }
            default: {
                Logger.warn('Unknow Game State!')
                break
            }
        }
    }

    public updateGameplay(deltaTime: number): void {
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

        for (const obstacle of this.currentObstacle) {
            if (!(<Cactus>obstacle).isIncanvas) {
                (<Cactus>obstacle).respawn()
                const isSmall = getRandomInRange(0, 1)
                const index = getRandomInRange(1, 6)
                let newSprite = undefined
                let asset = ''
                if (isSmall) {
                    asset = 'smallCactus' + index.toString()
                    ;(<Cactus>obstacle).position.y -= 10
                } else {
                    asset = 'cactus' + index.toString()
                }
                newSprite = this.resourceManager.loadResource(asset)
                ;(<Cactus>obstacle).loadResource(newSprite as Sprite)
            } else {
                if (this.dino.boxCollider.checkCollision((<Cactus>obstacle).boxCollider)) {
                    this.stopUpdate()
                    this.gameState = gameState.GAMEOVER
                }
            }
        }
        if (this.enemy.boxCollider.checkCollision(this.dino.boxCollider)) {
            this.stopUpdate()
            this.gameState = gameState.GAMEOVER
        }
        if (!this.enemy.isIncanvas) {
            this.enemy.respawn()
        }
    }

    public stopUpdate(): void {
        this.ground1.isUpdated = false
        this.ground2.isUpdated = false
        for (const cloud of this.clouds) {
            cloud.isUpdated = false
        }

        for (const obstacle of this.currentObstacle) {
            (<GameObject>obstacle).isUpdated = false
        }
        this.enemy.isUpdated = false
        this.dino.isDead = true
    }

    public override render(renderer: Renderer): void {
        super.render(renderer)
    }
}

export { GameManager }
