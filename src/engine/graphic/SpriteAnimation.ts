import { Sprite } from './Sprite'

class SpriteAnimation {
    private name: string
    private clip: Sprite[]
    private frameRate: number

    constructor(name: string, frameRate: number, clip?: Sprite[]) {
        this.name = name
        this.frameRate = frameRate

        if (clip != null) {
            this.clip = clip
        }
    }

    public setClip(clip: Sprite[]): void {}
}

export { SpriteAnimation }
