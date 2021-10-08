export class Result<Type> {
    data: Type;
    constructor(public errorCode: number, public mgs: String){}
}