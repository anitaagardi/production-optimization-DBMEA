export class Job {
    id: string;
    //the processing time in Tanaka benchmark
    processingTime: number;
    //the due date time in Tanaka benchmark
    dueDate: number;
    constructor(id: string, processingTime: number, dueDate: number) {
        this.id = id;
        this.processingTime = processingTime;
        this.dueDate = dueDate;
    }

}