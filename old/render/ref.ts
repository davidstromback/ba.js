export interface Ref<T = any> {
    current: T
}

export const createRef = <T>(value: T): Ref<T> => ({
    current: value
})