export interface IValidator<T> {
    (data: T): string | null
}