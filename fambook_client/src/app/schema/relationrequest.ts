export class RelationRequest {
    id : number;
    requesterName: string;
    requestMsg: string;
    status: string;
    requestedDate: Date;
    requesterImage: string;
    //relation : string;
    //uid: number
    constructor(public relation: string, public uid: number) { }
}