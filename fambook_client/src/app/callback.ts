import { Result } from "./schema/result";

export class CallBack<T>{
    onComplete(result : Result<T>): void{};
}