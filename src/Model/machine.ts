import { Job } from "./job";

export class Machine {
    id: string;
    jobs: Job[] = [];
    //the actual free time of the machine(in Tanaka and Eric)
    time: number = 0;
    //the actual tardiness (in Tanaka)
    tardiness: number = 0;
    constructor(id: string) {
        this.id = id;
    }

    pushJobTanaka(job: Job) {
        this.jobs.push(job);
        this.time = this.time + job.processingTime;
        // tardiness in inceasing if due date is larger than time
        if (this.time > job.dueDate) {
            this.tardiness += (this.time - job.dueDate);
        }
    }

    pushJobEric(job: Job, releaseTime: number, processingTime: number) {
        this.jobs.push(job);
        if (releaseTime > this.time) {
            this.time = releaseTime + processingTime;
        } else {
            this.time = this.time + processingTime;
        }

    }
    setTime(time: number) {
        this.time = time;
    }

}