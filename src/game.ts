import { DinoGame } from './dino/DinoGame'
import { Logger, Scene } from './engine/Engine'

const gameConfig = {
    timeScale: 1,
    deltaTime: 0,
    fps: 60,
}

const rendererConfig = {
    width: 1200,
    height: 700,
}

Logger.info('Game Start!')
const dinoGame = new DinoGame()

const scene = new Scene('Test')

dinoGame.addScene(scene)

dinoGame.init(gameConfig, rendererConfig)
Logger.info('Game End!')
