class Position {
    public x: number
    public y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

function addPosition(position1: Position, position2: Position): Position {
    return new Position(position1.x + position2.x, position1.y + position2.y)
}

export { Position, addPosition }
