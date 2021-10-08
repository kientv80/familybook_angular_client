export class Person {
    image: string = "";
    children: Person[] = [];
    isLoading: boolean = false;
    bornedDate: string = "";
    firstName: string = "";
    surname: string = "";
    passedDate: string = "";
    email: string = "";
    phoneNum: string = "";
    desc: string = "";
    gender: string = "";
    userName: string = "";
    relation: string = "";
    relationId: number;
    constructor(public id: number = -1, public name: string = "", public level: number = 1, public expandable = false) { }
}