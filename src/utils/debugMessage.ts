export const debug = import.meta.env.VITE_DEBUG === 'true'

export const debugMessage = (string: string) => {
    if (debug) {
        console.info(string)
    }
}
