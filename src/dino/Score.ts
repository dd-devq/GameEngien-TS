import { GameObject, Renderer, Vector2 } from '../engine/Engine'

export class Score extends GameObject {
    public score = 0
    public stringScore = ''
    public factor = 500
    readonly FACTOR = 2000
    public accumulate = 0

    constructor(name: string, position: Vector2) {
        super(name, position)
        this.stringScore = this.convertStringScore(this.score)
    }

    private convertStringScore(score: number): string {
        let stringScore = score.toString()
        for (let i = stringScore.length; i < 5; i++) {
            stringScore = '0' + stringScore
        }
        return stringScore
    }
    public override update(deltaTime: number): void {
        if (this.isUpdated) {
            this.increaseFactor()
            this.accumulate += this.factor * deltaTime
            if (this.accumulate > 1) {
                this.score += Math.round(this.accumulate)
                this.accumulate = 0
            }
        }
    }

    private increaseFactor() {
        if (this.factor < this.FACTOR) {
            this.factor += 0.2
        } else {
            this.factor = this.FACTOR
        }
    }

    public override render(renderer: Renderer): void {
        if (this.isActive) {
            this.stringScore = this.convertStringScore(this.score)
            renderer.drawText(this.stringScore, this.position)
        }
        super.render(renderer)
    }

    public override reset() {
        this.score = 0
        this.isUpdated = false
    }
}
