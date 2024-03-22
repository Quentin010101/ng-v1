
import { Commentaire } from "./commentaire.model"
import { Compartiment } from "./compartiment.model"
import { Item } from "./item.model"
import { Tag } from "./tag.model"

export class Task{
    taskId!: number
    dateCreation!: Date
    dateEcheance!: Date
    title!: string
    text!: string
    progression!: number
    importance!: number
    taskorder!: number
    compartiment!: Compartiment
    tag!: Tag
    items!: Item[]
    commentaires!: Commentaire[]
}