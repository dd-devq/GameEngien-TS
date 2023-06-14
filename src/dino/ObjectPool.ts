import { GameObject, Vector2 } from '../engine/Engine'

class ObjectPool<T extends GameObject> {
    private pool: T[]
    private factory: (name: string, position?: Vector2) => T
    constructor(factory: (name: string, position?: Vector2) => T) {
        this.pool = []
        this.factory = factory
    }

    private createInstance(name: string, position?: Vector2): T {
        return this.factory(name, position)
    }

    public acquire(name: string, position?: Vector2): T | undefined {
        if (this.pool.length) {
            for (const obj of this.pool) {
                if (obj.name == name) {
                    return obj
                }
            }
        }
        return this.createInstance(name, position)
    }

    public release(object: T) {
        if (object instanceof Object) {
            object.reset()
            this.pool.push(object)
        }
    }

    public acquireAll(): T[] {
        return this.pool
    }
}

export { ObjectPool }
