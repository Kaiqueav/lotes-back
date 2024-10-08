export class TaskDto{
    id:  String;
    title:  String;
    status: String;
    expirationDate:  Date;

}

export interface FindAllParameters{
    title: string;
    status: string;
}