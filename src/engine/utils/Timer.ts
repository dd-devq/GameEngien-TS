import { Logger } from './Logger'

class Timer {
    private static startTime = 0
    private static endTime = 0
    private static isRunning = false

    public static start(): void {
        if (Timer.isRunning) {
            Logger.error('Timer is already active!')
            return
        }

        Timer.startTime = performance.now()
        Timer.isRunning = true
    }

    public static end(): void {
        if (!Timer.isRunning) {
            Logger.error('No active timer exists!')
            return
        }

        Timer.endTime = performance.now()
        Timer.isRunning = false
    }

    public static reset() {
        Timer.startTime = 0
        Timer.endTime = 0
        Timer.isRunning = false
    }

    public static getDeltaTime(): number {
        const deltaTime: number = (this.startTime - this.endTime) / 1000
        return deltaTime
    }
}

export { Timer }
