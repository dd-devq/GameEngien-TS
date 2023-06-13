import { Vector2, Sprite, Game, SpriteAnimation, SpriteAnimator, Scene } from '../engine/Engine'

import { GameManager } from './GameManager'
import { Ground } from './Ground'
import { Dino } from './Dino'
import { Cloud } from './Cloud'

class DinoGame extends Game {
    constructor(renderConfig: RendererConfig) {
        super()

        const defaultScene = new Scene('Default')
        this.addScene(defaultScene)
        this.initGame(renderConfig)
        this.gameLoop()
    }

    public override initGame(renderConfig: RendererConfig): void {
        super.initGame(renderConfig)
        const gameManager: GameManager = new GameManager('Dino Game Manager')
        this.nowActiveScene.addGameObject(gameManager)
        this.loadResource()
        this.setupGameObject(gameManager)
    }

    public override gameLoop(): void {
        super.gameLoop()
    }

    private loadResource(): void {
        // Dino Resources
        const dinoIdle = new Sprite(this.resourceManager, 'assets/Dino/dinoIdle.png')
        this.resourceManager.registerResource('dinoIdle', dinoIdle)

        const dinoJump = new Sprite(this.resourceManager, 'assets/Dino/dinoJump.png')
        this.resourceManager.registerResource('dinoJump', dinoJump)

        const dinoDead = new Sprite(this.resourceManager, 'assets/Dino/dinoDead.png')
        this.resourceManager.registerResource('dinoDead', dinoDead)

        const dinoRunFrame1 = new Sprite(this.resourceManager, 'assets/Dino/dinoRunFrame1.png')
        this.resourceManager.registerResource('dinoRunFrame1', dinoRunFrame1)

        const dinoRunFrame2 = new Sprite(this.resourceManager, 'assets/Dino/dinoRunFrame2.png')
        this.resourceManager.registerResource('dinoRunFrame2', dinoRunFrame2)

        const dinoCrouchFrame1 = new Sprite(
            this.resourceManager,
            'assets/Dino/dinoCrouchFrame1.png'
        )
        this.resourceManager.registerResource('dinoCrouchFrame1', dinoCrouchFrame1)

        const dinoCrouchFrame2 = new Sprite(
            this.resourceManager,
            'assets/Dino/dinoCrouchFrame2.png'
        )
        this.resourceManager.registerResource('dinoCrouchFrame2', dinoCrouchFrame2)

        // NPC Resources
        const bird1 = new Sprite(this.resourceManager, 'assets/Enemy/bird1.png')
        this.resourceManager.registerResource('bird1', bird1)

        const bird2 = new Sprite(this.resourceManager, 'assets/Enemy/bird2.png')
        this.resourceManager.registerResource('bird2', bird2)

        // ENV Resources
        const ground = new Sprite(this.resourceManager, 'assets/Env/ground.png')
        this.resourceManager.registerResource('ground', ground)

        const cloud = new Sprite(this.resourceManager, 'assets/Env/cloud.png')
        this.resourceManager.registerResource('cloud', cloud)

        const cactus1 = new Sprite(this.resourceManager, 'assets/Env/cactus1.png')
        this.resourceManager.registerResource('cactus1', cactus1)

        const cactus2 = new Sprite(this.resourceManager, 'assets/Env/cactus2.png')
        this.resourceManager.registerResource('cactus2', cactus2)

        const cactus3 = new Sprite(this.resourceManager, 'assets/Env/cactus3.png')
        this.resourceManager.registerResource('cactus3', cactus3)

        const cactus4 = new Sprite(this.resourceManager, 'assets/Env/cactus4.png')
        this.resourceManager.registerResource('cactus4', cactus4)

        const cactus5 = new Sprite(this.resourceManager, 'assets/Env/cactus5.png')
        this.resourceManager.registerResource('cactus5', cactus5)

        const cactus6 = new Sprite(this.resourceManager, 'assets/Env/cactus6.png')
        this.resourceManager.registerResource('cactus6', cactus6)

        const smallCactus1 = new Sprite(this.resourceManager, 'assets/Env/smallCactus1.png')
        this.resourceManager.registerResource('smallCactus1', smallCactus1)

        const smallCactus2 = new Sprite(this.resourceManager, 'assets/Env/smallCactus2.png')
        this.resourceManager.registerResource('smallCactus2', smallCactus2)

        const smallCactus3 = new Sprite(this.resourceManager, 'assets/Env/smallCactus3.png')
        this.resourceManager.registerResource('smallCactus3', smallCactus3)

        const smallCactus4 = new Sprite(this.resourceManager, 'assets/Env/smallCactus4.png')
        this.resourceManager.registerResource('smallCactus4', smallCactus4)

        const smallCactus5 = new Sprite(this.resourceManager, 'assets/Env/smallCactus5.png')
        this.resourceManager.registerResource('smallCactus5', smallCactus5)

        const smallCactus6 = new Sprite(this.resourceManager, 'assets/Env/smallCactus6.png')
        this.resourceManager.registerResource('smallCactus6', smallCactus6)

        // UI Resources
        const digit1 = new Sprite(this.resourceManager, 'assets/UI/1.png')
        this.resourceManager.registerResource('digit1', digit1)

        const digit2 = new Sprite(this.resourceManager, 'assets/UI/2.png')
        this.resourceManager.registerResource('digit2', digit2)

        const digit3 = new Sprite(this.resourceManager, 'assets/UI/3.png')
        this.resourceManager.registerResource('digit3', digit3)

        const digit4 = new Sprite(this.resourceManager, 'assets/UI/4.png')
        this.resourceManager.registerResource('digit4', digit4)

        const digit5 = new Sprite(this.resourceManager, 'assets/UI/5.png')
        this.resourceManager.registerResource('digit5', digit5)

        const digit6 = new Sprite(this.resourceManager, 'assets/UI/6.png')
        this.resourceManager.registerResource('digit6', digit6)

        const digit7 = new Sprite(this.resourceManager, 'assets/UI/7.png')
        this.resourceManager.registerResource('digit7', digit7)

        const digit8 = new Sprite(this.resourceManager, 'assets/UI/6.png')
        this.resourceManager.registerResource('digit8', digit8)

        const digit9 = new Sprite(this.resourceManager, 'assets/UI/9.png')
        this.resourceManager.registerResource('digit9', digit9)

        const charH = new Sprite(this.resourceManager, 'assets/UI/h.png')
        this.resourceManager.registerResource('charH', charH)

        const charI = new Sprite(this.resourceManager, 'assets/UI/i.png')
        this.resourceManager.registerResource('charI', charI)

        const gameOver = new Sprite(this.resourceManager, 'assets/UI/gameOver.png')
        this.resourceManager.registerResource('gameOver', gameOver)

        const replay = new Sprite(this.resourceManager, 'assets/UI/replay.png')
        this.resourceManager.registerResource('replay', replay)
    }

    private setupGameObject(gameManager: GameManager): void {
        this.setupEnvironment(gameManager)
        this.setupDino(gameManager)
    }

    public setupEnvironment(gameManager: GameManager): void {
        const groundSprite = this.resourceManager.loadResource('ground')

        const ground1 = new Ground('ground1', new Vector2(-600, -75))
        const ground2 = new Ground('ground2', new Vector2(1800, -75))

        if (groundSprite !== undefined) {
            ground1.loadResource(groundSprite)
            ground2.loadResource(groundSprite)
        }

        this.nowActiveScene.addGameObject(ground1)
        this.nowActiveScene.addGameObject(ground2)
        gameManager.ground1 = ground1
        gameManager.ground2 = ground2

        const cloudSprite = this.resourceManager.loadResource('cloud')
        const cloud1 = new Cloud('cloud1', new Vector2(700, -25))
        const cloud2 = new Cloud('cloud2', new Vector2(1000, -0))
        const cloud3 = new Cloud('cloud3', new Vector2(1200, 25))
        const cloud4 = new Cloud('cloud4', new Vector2(1500, 75))
        if (cloudSprite !== undefined) {
            cloud1.loadResource(cloudSprite)
            cloud2.loadResource(cloudSprite)
            cloud3.loadResource(cloudSprite)
            cloud4.loadResource(cloudSprite)
        }

        this.nowActiveScene.addGameObject(cloud1)
        this.nowActiveScene.addGameObject(cloud2)
        this.nowActiveScene.addGameObject(cloud3)
        this.nowActiveScene.addGameObject(cloud4)
        gameManager.clouds.push(cloud1)
        gameManager.clouds.push(cloud2)
        gameManager.clouds.push(cloud3)
        gameManager.clouds.push(cloud4)
    }

    private setupBird(): void {
        //
    }

    private setupScore(): void {
        //
    }

    private setupUI(): void {
        //
    }

    private setupDino(gameManager: GameManager): void {
        const dino = new Dino('Dino', new Vector2(-500, -40))
        const dinoAnimator = new SpriteAnimator(dino)
        dino.dinoAnimator = dinoAnimator
        dino.addComponent(dinoAnimator)

        const idleAnimation = new SpriteAnimation('Idle', 175)
        const deadAnimation = new SpriteAnimation('Dead', 175)
        const jumpAnimation = new SpriteAnimation('Jump', 175)
        const runAnimation = new SpriteAnimation('Run', 175)
        const crouchAnimation = new SpriteAnimation('Crouch', 175)

        const idleClip = [this.resourceManager.loadResource('dinoIdle')]
        const deadClip = [this.resourceManager.loadResource('dinoDead')]
        const jumpClip = [this.resourceManager.loadResource('dinoJump')]
        const runClip = [
            this.resourceManager.loadResource('dinoRunFrame1'),
            this.resourceManager.loadResource('dinoRunFrame2'),
        ]
        const crouchClip = [
            this.resourceManager.loadResource('dinoCrouchFrame1'),
            this.resourceManager.loadResource('dinoCrouchFrame2'),
        ]

        idleAnimation.setClip(idleClip as Sprite[])
        deadAnimation.setClip(deadClip as Sprite[])
        jumpAnimation.setClip(jumpClip as Sprite[])
        runAnimation.setClip(runClip as Sprite[])
        crouchAnimation.setClip(crouchClip as Sprite[])

        dinoAnimator.registerAnimation('Idle', idleAnimation)
        dinoAnimator.registerAnimation('Dead', deadAnimation)
        dinoAnimator.registerAnimation('Jump', jumpAnimation)
        dinoAnimator.registerAnimation('Run', runAnimation)
        dinoAnimator.registerAnimation('Crouch', crouchAnimation)
        dinoAnimator.play('Idle')

        dino.init()

        this.nowActiveScene.addGameObject(dino)
        gameManager.dino = dino
    }
}

export { DinoGame }
