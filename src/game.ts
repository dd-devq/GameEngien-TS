import { DinoGame } from './dino/DinoGame'
import { Logger } from './engine/Engine'

const gameConfig = {
    deltaTime: 0,
    fps: 60,
}

const rendererConfig = {
    width: 1200,
    height: 250,
}

Logger.info('Game Start!')
const dinoGame = new DinoGame()

dinoGame.init(gameConfig, rendererConfig)
Logger.info('Game End!')
