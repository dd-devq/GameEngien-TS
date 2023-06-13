import { DinoGame } from './dino/DinoGame'

const rendererConfig = {
    width: 1200,
    height: 250,
}

window.onload = () => {
    new DinoGame(rendererConfig)
}
