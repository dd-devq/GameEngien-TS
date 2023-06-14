import { GameObject, Vector2 } from '../engine/Engine'

class Bird extends GameObject {}

function createBird(name: string, position?: Vector2): Bird {
    return new Bird(name, position)
}
export { Bird, createBird }
