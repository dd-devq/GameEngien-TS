import { Engine } from '../engine'

class DinoGame extends Engine.Game {
    constructor() {
        super()
        Engine.Logger.info('Game Initialized!')
    }

    public override init(gameConfig: GameConfig, renderConfig: RendererConfig): boolean {
        return super.init(gameConfig, renderConfig)
    }

    protected override update(): void {
        super.update()
    }

    // Load before game
    // pass path & url
    public loadResource(): void {
        const dinoIdle = new Engine.Sprite('assets/Dino/dinoIdle.png')
        const dinoRunFrame1 = new Engine.Sprite('assets/Dino/dinoRunFrame1.png')
        const dinoRunFrame2 = new Engine.Sprite('assets/Dino/dinoRunFrame2.png')
        const dinoCrouchFrame1 = new Engine.Sprite('assets/Dino/dinoCrouchFram1.png')
        const dinoCrouchFrame2 = new Engine.Sprite('assets/Dino/dinoCrouchFram2.png')
        this.resourceManager.registerResource('dinoIdle', dinoIdle)
    }
}

export { DinoGame }
