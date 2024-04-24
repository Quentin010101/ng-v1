import { Validators } from "@angular/forms";

export const Validation = {
    input:{
        user: {
            userId: Validators.required,
            pseudo: [Validators.required, Validators.minLength(4), Validators.maxLength(12)],
            role: Validators.required,
            accountNonLocked: Validators.required,
            password: [Validators.required, Validators.minLength(4), Validators.maxLength(30)]
        },
        task: {
            taskId: Validators.required,
            dateCreation: Validators.required,
            title: [Validators.required, Validators.minLength(4), Validators.maxLength(20)],
            text: [ Validators.maxLength(255)],
            compartiment: {
                compartimentId: Validators.required,
                name: [Validators.required, Validators.minLength(4), Validators.maxLength(20)],
                compartimentOrder: Validators.required,
            },
            tag: {
                tagId: Validators.required,
                name: [Validators.required, Validators.minLength(4), Validators.maxLength(15)]
            },
            item: {
                itemId: Validators.required,
                text: [Validators.minLength(1), Validators.maxLength(50)],
                actif: Validators.required, 
            },
            commentaire: {
                commentaireId: Validators.required,
                text: [Validators.minLength(1), Validators.maxLength(100)],
                dateCreation: Validators.required,
            }
        },

    }
}