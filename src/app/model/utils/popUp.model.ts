export class PopUp{
    constructor(message: string){
        this.message = message
    }
    message!: string
    warning:boolean = false
    actionValidate: string = "Yes"
    actionCancel: string = "Cancel"
    type: PopUpType = PopUpType.DEFAULT
}

export enum PopUpResponse{
    CLOSE, CANCEL, VALIDATE
}
export enum PopUpType{
    DEFAULT, MASTERMIND, USERDELETE
}