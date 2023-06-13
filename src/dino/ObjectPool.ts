class ObjectPool<T> {
    private pool: T[]

    constructor() {
        this.pool = []
    }
}

export { ObjectPool }
