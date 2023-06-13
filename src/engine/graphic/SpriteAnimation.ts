import { Sprite } from './Sprite'

class SpriteAnimation {
    private name: string
    private clip: Sprite[]
    private currentFrameIndex: number
    private currentFrameTime: number
    private frameRate: number

    constructor(name: string, frameRate: number, clip?: Sprite[]) {
        this.name = name
        this.frameRate = frameRate
        if (clip != null) {
            this.clip = clip
        }
        this.currentFrameIndex = 0
        this.currentFrameTime = 0
    }

    public setClip(clip: Sprite[]): void {
        this.clip = clip
    }

    public getCurrentFrame(): Sprite {
        return this.clip[this.currentFrameIndex]
    }

    update(deltaTime: number): void {
        this.currentFrameTime += deltaTime + 0.001
        if (this.currentFrameTime > 1 / this.frameRate) {
            this.currentFrameIndex = (this.currentFrameIndex + 1) % this.clip.length
            this.currentFrameTime = 0
        }
    }
}

export { SpriteAnimation }
