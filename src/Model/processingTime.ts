import { Job } from "./job";
import { Machine } from "./machine";

/**
 * The processing times in Eric dataset
*/
export class ProcessingTime {
    job: Job;
    machine: Machine;
    processingTime: number;
    constructor(job: Job, machine: Machine, processingTime: number) {
        this.job = job;
        this.machine = machine;
        this.processingTime = processingTime;
    }
}