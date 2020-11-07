import { Job } from "../Model/job";
import { Machine } from "../Model/machine";
import * as fs from 'fs';
import { ProcessingTime } from "../Model/processingTime";
import { exception } from "console";

/**
 * Reads the benchmark dataset
* @property {Job[]} jobs - the jobs, which contains the benchmark dataset
* @property {Machine[]} machines - the machines, which contains the benchmark dataset
*/
export class BenchmarkReaderEric {

    jobs: Job[] = [];
    machines: Machine[] = [];
    processingTimes: ProcessingTime[] = [];
    bestFitness: number;
    //the whole benchmark data (job, machine, processing time) of the whole txt file
    oneFileJobs: Job[][] = [];
    oneFileMachines: Machine[][] = [];
    oneFileProcessingTime: ProcessingTime[][] = [];
    oneFileBestFitness: number[] = [];
    /**
      * Reads the whole file (contains many benchmark data)
      */
    public readTheFile(benchmarkFile) {
        var data = fs.readFileSync(benchmarkFile);
        let inputDataRows: string[] = data.toString().split("\n");
        let numberOfMachines, numberOfJobs;
        //just one benchmark data (job, machine, processing time) of the txt file
        let actualFileJobs: Job[] = [];
        let actualFileMachines: Machine[] = [];
        let actualFileProcessingTime: ProcessingTime[] = [];
        let actualMachineIndex = 0;
        for (let i = 0; i < inputDataRows.length; i++) {
            //remove the first row of the file: number of jobs....
            let inputDataRowData: string[] = inputDataRows[i].trim().split(/[ ]+/);
            if (inputDataRows[i].includes("number of jobs")) {
                //add the previous data to the collections
                if (actualFileJobs.length != 0 && actualFileMachines.length != 0 && actualFileProcessingTime.length != 0) {
                    this.oneFileJobs.push(actualFileJobs);
                    this.oneFileMachines.push(actualFileMachines);
                    this.oneFileProcessingTime.push(actualFileProcessingTime);
                }
                //set to blank the actual file
                actualFileJobs = [];
                actualFileMachines = [];
                actualFileProcessingTime = [];
                actualMachineIndex = 0;
                continue;
            }
            //number of jobs, number of machines, initial seed, upper bound and lower bound
            if (inputDataRowData.length == 5) {
                numberOfJobs = inputDataRowData[0];
                numberOfMachines = inputDataRowData[1];
                this.oneFileBestFitness.push(Number(inputDataRowData[3]))
                for (let j = 0; j < numberOfJobs; j++) {
                    let job = new Job(j + "", 0, 0);
                    actualFileJobs.push(job);
                }
                for (let j = 0; j < numberOfMachines; j++) {
                    let machine = new Machine(j + "");
                    actualFileMachines.push(machine);
                }

                continue;
            }
            //remove the processing times:
            if (inputDataRows[i].includes("processing times")) {
                continue;
            }
            //the processing time section
            for (let j = 0; j < inputDataRowData.length; j++) {
                let processingTime = new ProcessingTime(actualFileJobs[j], actualFileMachines[actualMachineIndex], Number(inputDataRowData[j]));
                actualFileProcessingTime.push(processingTime);
            }
            actualMachineIndex++;

        }
        //last also add the jobs, machines and processing times
        if (actualFileJobs.length != 0 && actualFileMachines.length != 0 && actualFileProcessingTime.length != 0) {
            this.oneFileJobs.push(actualFileJobs);
            this.oneFileMachines.push(actualFileMachines);
            this.oneFileProcessingTime.push(actualFileProcessingTime);
        }
    }
    /*
    Set the actual (next) benchmark data of the file
    */
    public setOneBenchmark(benchmarkIndex: number) {
        this.jobs = this.oneFileJobs[benchmarkIndex];
        this.machines = this.oneFileMachines[benchmarkIndex];
        this.processingTimes = this.oneFileProcessingTime[benchmarkIndex];
        this.bestFitness = this.oneFileBestFitness[benchmarkIndex];
    }
    public getFileSize(): number {
        return this.oneFileJobs.length;
    }
    public getProcessingTime(job: Job, machine: Machine): number {
        for (let i = 0; i < this.processingTimes.length; i++) {
            if (this.processingTimes[i].job.id == job.id && this.processingTimes[i].machine.id == machine.id) {
                return this.processingTimes[i].processingTime;
            }
        }
        throw new exception("Invalid job or machine, processing time cannot be returned");
    }
}