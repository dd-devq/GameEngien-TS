import { SpriteAnimation } from './SpriteAnimation'
import { Component } from '../core/Component'
import { Sprite } from './Sprite'
class SpriteAnimator extends Component {
    public animationClips: Map<string, SpriteAnimation>
    public currentAnimation: string

    constructor() {
        super()
        this.animationClips = new Map<string, SpriteAnimation>()
        this.currentAnimation = ''
    }

    override update(deltaTime: number): void {
        this.animationClips.get(this.currentAnimation)?.update(deltaTime)
    }

    public play(animation: string): void {
        console.log(animation)
        if (this.currentAnimation !== animation) {
            this.currentAnimation = animation
            this.animationClips.get(this.currentAnimation)?.update(0)
        }
    }

    public registerAnimation(animation: string, animationClip: SpriteAnimation): void {
        this.animationClips.set(animation, animationClip)
    }

    public getCurrentFrame(): Sprite | undefined {
        return this.animationClips.get(this.currentAnimation)?.getCurrentFrame()
    }
}

export { SpriteAnimator }
