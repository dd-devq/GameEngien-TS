function generateUUID(length: number): string {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let uuid = ''

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        uuid += characters.charAt(randomIndex)
    }

    return uuid
}

function getRandomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export { generateUUID, getRandomInRange }
