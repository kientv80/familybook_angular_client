export class Person {
    image : string;
    constructor(public id: number, public name: string,public level:number =1, public expandable = false) { }
    children: Person[]=[];
    isLoading: boolean;
}