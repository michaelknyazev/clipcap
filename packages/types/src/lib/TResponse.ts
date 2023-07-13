export interface TResponse<Result = void> {
  success: boolean,
  event: string,
  result: Result
}