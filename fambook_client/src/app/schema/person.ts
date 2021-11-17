export class Person {
    image: string = "";
    children: Person[] = [];
    isLoading: boolean = false;
    bornedDate: string = "";
    firstName: string = "";
    lastName: string = "";
    passedDate: string = "";
    email: string = "";
    phoneNum: string = "";
    desc: string = "";
    gender: string = "";
    userName: string = "";
    relation: string = "";
    relationId: number;
    passWorld: string;
    rpassWorld: string;
    constructor(public id: number = -1, public name: string = "", public level: number = 1, public expandable = false) { }
}