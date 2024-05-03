export class PopUp{
    constructor(message: string){
        this.message = message
    }
    message!: string
    warning:boolean = false
    actionValidate: string = "Yes"
    actionCancel: string = "Cancel"
}

export enum PopUpResponse{
    CLOSE, CANCEL, VALIDATE
}