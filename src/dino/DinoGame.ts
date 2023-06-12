import { Game, Position } from '../engine/Engine'
import { Logger } from '../engine/Engine'
import { Sprite } from '../engine/Engine'
import { GameManager } from './GameManager'
import { Ground } from './Ground'

class DinoGame extends Game {
    private gameManager: GameManager
    constructor() {
        super()
        Logger.info('Game Initialized!')
    }

    public override init(gameConfig: GameConfig, renderConfig: RendererConfig): boolean {
        const init: boolean = super.init(gameConfig, renderConfig)
        this.gameManager = new GameManager('DinoGameManager')
        this.setupGame()
        this.loadResource()
        this.setupGameObject()
        requestAnimationFrame(this.gameLoop)
        return init
    }

    protected override update(): void {
        super.update()
        Logger.info('Game Updated')
    }

    public loadResource(): void {
        Logger.info('Loading Resources')
        // Dino Resources
        const dinoIdle = new Sprite('assets/Dino/dinoIdle.png')
        this.resourceManager.registerResource('dinoIdle', dinoIdle)

        const dinoJump = new Sprite('assets/Dino/dinoJump.png')
        this.resourceManager.registerResource('dinoJump', dinoJump)

        const dinoDead = new Sprite('assets/Dino/dinoDead.png')
        this.resourceManager.registerResource('dinoDead', dinoDead)

        const dinoRunFrame1 = new Sprite('assets/Dino/dinoRunFrame1.png')
        this.resourceManager.registerResource('dinoRunFrame1', dinoRunFrame1)

        const dinoRunFrame2 = new Sprite('assets/Dino/dinoRunFrame2.png')
        this.resourceManager.registerResource('dinoRunFrame2', dinoRunFrame2)

        const dinoCrouchFrame1 = new Sprite('assets/Dino/dinoCrouchFrame1.png')
        this.resourceManager.registerResource('dinoCrouchFrame1', dinoCrouchFrame1)

        const dinoCrouchFrame2 = new Sprite('assets/Dino/dinoCrouchFrame2.png')
        this.resourceManager.registerResource('dinoCrouchFrame2', dinoCrouchFrame2)

        // NPC Resources
        const bird1 = new Sprite('assets/Enemy/bird1.png')
        this.resourceManager.registerResource('bird1', bird1)

        const bird2 = new Sprite('assets/Enemy/bird2.png')
        this.resourceManager.registerResource('bird2', bird2)

        // ENV Resources
        const ground = new Sprite('assets/Env/ground.png')
        this.resourceManager.registerResource('ground', ground)

        const cloud = new Sprite('assets/Env/cloud.png')
        this.resourceManager.registerResource('cloud', cloud)

        const cactus1 = new Sprite('assets/Env/cactus1.png')
        this.resourceManager.registerResource('cactus1', cactus1)

        const cactus2 = new Sprite('assets/Env/cactus2.png')
        this.resourceManager.registerResource('cactus2', cactus2)

        const cactus3 = new Sprite('assets/Env/cactus3.png')
        this.resourceManager.registerResource('cactus3', cactus3)

        const cactus4 = new Sprite('assets/Env/cactus4.png')
        this.resourceManager.registerResource('cactus4', cactus4)

        const cactus5 = new Sprite('assets/Env/cactus5.png')
        this.resourceManager.registerResource('cactus5', cactus5)

        const cactus6 = new Sprite('assets/Env/cactus6.png')
        this.resourceManager.registerResource('cactus6', cactus6)

        const smallCactus1 = new Sprite('assets/Env/smallCactus1.png')
        this.resourceManager.registerResource('smallCactus1', smallCactus1)

        const smallCactus2 = new Sprite('assets/Env/smallCactus2.png')
        this.resourceManager.registerResource('smallCactus2', smallCactus2)

        const smallCactus3 = new Sprite('assets/Env/smallCactus3.png')
        this.resourceManager.registerResource('smallCactus3', smallCactus3)

        const smallCactus4 = new Sprite('assets/Env/smallCactus4.png')
        this.resourceManager.registerResource('smallCactus4', smallCactus4)

        const smallCactus5 = new Sprite('assets/Env/smallCactus5.png')
        this.resourceManager.registerResource('smallCactus5', smallCactus5)

        const smallCactus6 = new Sprite('assets/Env/smallCactus6.png')
        this.resourceManager.registerResource('smallCactus6', smallCactus6)

        // UI Resources
        const digit1 = new Sprite('assets/UI/1.png')
        this.resourceManager.registerResource('digit1', digit1)

        const digit2 = new Sprite('assets/UI/2.png')
        this.resourceManager.registerResource('digit2', digit2)

        const digit3 = new Sprite('assets/UI/3.png')
        this.resourceManager.registerResource('digit3', digit3)

        const digit4 = new Sprite('assets/UI/4.png')
        this.resourceManager.registerResource('digit4', digit4)

        const digit5 = new Sprite('assets/UI/5.png')
        this.resourceManager.registerResource('digit5', digit5)

        const digit6 = new Sprite('assets/UI/6.png')
        this.resourceManager.registerResource('digit6', digit6)

        const digit7 = new Sprite('assets/UI/7.png')
        this.resourceManager.registerResource('digit7', digit7)

        const digit8 = new Sprite('assets/UI/6.png')
        this.resourceManager.registerResource('digit8', digit8)

        const digit9 = new Sprite('assets/UI/9.png')
        this.resourceManager.registerResource('digit9', digit9)

        const charH = new Sprite('assets/UI/h.png')
        this.resourceManager.registerResource('charH', charH)

        const charI = new Sprite('assets/UI/i.png')
        this.resourceManager.registerResource('charI', charI)

        const gameOver = new Sprite('assets/UI/gameOver.png')
        this.resourceManager.registerResource('gameOver', gameOver)

        const replay = new Sprite('assets/UI/replay.png')
        this.resourceManager.registerResource('replay', replay)
    }

    public setupGameObject(): void {
        this.setupGround()
    }

    public setupGame(): void {}

    public setupGround(): void {
        const ground1 = new Ground('ground1', new Position(-600, -75))
        const groundSprite = this.resourceManager.loadResource('ground')
        const ground2 = new Ground('ground2', new Position(-600 + 2400, -75))
        if (groundSprite !== undefined) {
            ground1.loadResource(groundSprite)
            ground2.loadResource(groundSprite)
        }
        this.nowActiveScene.addGameObject(ground1)
        this.nowActiveScene.addGameObject(ground2)
    }

    public setupBird(): void {}

    public setupScore(): void {}

    public setupUI(): void {}

    public setupDino(): void {}

    public setupGameManager(): void {}
}

abstract class GameState {
    constructor() {}
}

export { DinoGame }
