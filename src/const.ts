export const zIndex = '2147483647'
export const containerID = '__gpt-word-book'
export const componentIDPrefix = '__gpt-word-book-'
export const containerRootID = '__gpt-word-book-root'

export const componentID = (id: string): string => {
    return componentIDPrefix + id
}
