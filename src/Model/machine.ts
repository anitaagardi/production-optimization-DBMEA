import { Job } from "./job";

export class Machine {
    id: string;
    jobs: Job[] = [];
    time: number = 0;
    tardiness: number = 0;
    constructor(id: string) {
        this.id = id;
    }
    pushJob(job: Job) {
        this.jobs.push(job);
        this.time = this.time + job.processingTime;
        // tardiness in inceasing if due date is larger than time
        if (this.time > job.dueDate) {
            this.tardiness += (this.time - job.dueDate);
        }
    }

}