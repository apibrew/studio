export function randomHex(n: number) {
    return [...Array(n)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
}
