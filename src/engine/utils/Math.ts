class Vector2 {
    public x: number
    public y: number

    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }
    public scale(scalar: number): Vector2 {
        return new Vector2(this.x * scalar, this.y * scalar)
    }

    public add(vector: Vector2): Vector2 {
        return new Vector2(this.x + vector.x, this.y + vector.y)
    }

    public min(vector: Vector2): Vector2 {
        return new Vector2(this.x - vector.x, this.y - vector.y)
    }

    public mul(vector: Vector2): Vector2 {
        return new Vector2(this.x * vector.x, this.y * vector.y)
    }

    public div(vector: Vector2): Vector2 {
        return new Vector2(this.x / vector.x, this.y / vector.y)
    }

    public reset(): void {
        this.x = 0
        this.y = 0
    }
}

export { Vector2 }
