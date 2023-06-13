import { Component } from '../core/Component'
import { Renderer } from '../Engine'
class UIElement extends Component {
    public override render(renderer: Renderer): void {}
    public override update(deltaTime: number): void {}
}

export { UIElement }
