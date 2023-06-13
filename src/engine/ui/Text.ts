import { Renderer } from '../Engine'
import { Component } from '../core/Component'

class Text extends Component {
    public override render(renderer: Renderer): void {}
    public override update(deltaTime: number): void {}
}

export { Text }
