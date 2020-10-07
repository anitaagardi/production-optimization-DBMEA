export class Job {
    id: string;
    processingTime: number;
    dueDate: number;
    constructor(id: string, processingTime: number, dueDate: number) {
        this.id = id;
        this.processingTime = processingTime;
        this.dueDate = dueDate;
    }

}