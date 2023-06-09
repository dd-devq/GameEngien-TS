import { SpriteAnimation } from './SpriteAnimation'
import { Component } from '../core/Component'

class SpriteAnimator extends Component {
    public animationClips: Map<string, SpriteAnimation>
}

export { SpriteAnimator }
