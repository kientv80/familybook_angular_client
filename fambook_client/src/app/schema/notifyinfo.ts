export class NotifyInfo {
    // type : info,warn,success,error
    constructor(public type: string, public title: string, public content: string, public showBtn: boolean, public okLabel: string, public cancelLavel: string) { }

}