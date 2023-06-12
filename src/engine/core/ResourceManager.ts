import { Logger } from '../utils/Logger'
class ResourceManager {
    private resourceCache: Map<string, IRenderResource>

    constructor() {
        this.resourceCache = new Map<string, IRenderResource>()
        Logger.info('Resource Manager Initialized!')
    }

    public registerResource(name: string, resource: IRenderResource): void {
        if (this.resourceCache.get(name) != undefined) {
            Logger.warn(`Cached resource: ${name}!`)
            return
        }
        this.resourceCache.set(name, resource)
    }

    public loadResource(name: string): IRenderResource | undefined {
        if (this.resourceCache.get(name) !== undefined) {
            return this.resourceCache.get(name)
        }
        Logger.warn(`Unknown resource: ${name}!`)
        return undefined
    }
}

export { ResourceManager }
