import { SpriteAnimation } from './SpriteAnimation'
import { Component } from '../core/Component'
import { Sprite } from './Sprite'
import { Renderer } from './Renderer'
class SpriteAnimator extends Component {
    public animationClips: Map<string, SpriteAnimation>
    public currentAnimation: string

    constructor(parent: IRenderable) {
        super(parent)
        this.animationClips = new Map<string, SpriteAnimation>()
        this.currentAnimation = ''
    }

    public override render(renderer: Renderer): void {
        if (this.isActive && this.isDrawable) {
            // render
        }
    }

    override update(deltaTime: number): void {
        if (this.isActive) {
            this.animationClips.get(this.currentAnimation)?.update(deltaTime)
        }
    }

    public play(animation: string): void {
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
