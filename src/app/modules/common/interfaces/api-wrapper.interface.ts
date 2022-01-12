export interface IAPIWrapper<T> {
    message: string;
    data?: T;
    result?: T;
    status?: number

}