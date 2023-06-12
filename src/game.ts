import { DinoGame } from './dino/DinoGame'

const gameConfig = {
    deltaTime: 0,
    fps: 60,
}

const rendererConfig = {
    width: 1200,
    height: 250,
}

const dinoGame = new DinoGame()

dinoGame.init(gameConfig, rendererConfig)
