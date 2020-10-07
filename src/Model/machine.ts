import { Job } from "./job";

export class Machine {
    id: string;
    jobs: Job[] = [];
    actualFreeTime: number = 0;
    dueDate: number = 0;
    constructor(id: string) {
        this.id = id;
    }
    pushJob(job: Job) {
        this.jobs.push(job);
        this.actualFreeTime = this.actualFreeTime + job.processingTime;
        if (this.actualFreeTime > job.dueDate) {
            this.dueDate = this.dueDate + (this.actualFreeTime - job.dueDate);
        }
    }

}