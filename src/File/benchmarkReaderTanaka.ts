import { Job } from "../Model/job";
import { Machine } from "../Model/machine";

import * as fs from 'fs';
/**
 * Reads the benchmark dataset
* @property {Job[]} jobs - the jobs, which contains the benchmark dataset
* @property {Machine[]} machines - the machines, which contains the benchmark dataset
*/
export class BenchmarkReaderTanaka {

    jobs: Job[] = [];
    machines: Machine[] = [];
    /**
      * Reads one benchmark data
      */
    public readOne(benchmarkFile) {

        var data = fs.readFileSync(benchmarkFile);

        let inputDataRows: string[] = data.toString().split("\n");
        let numberOfMachines, numberOfJobs;
        for (let i = 0; i < inputDataRows.length; i++) {
            //remove comments in file
            if (inputDataRows[i].includes("#")) {
                continue;
            }
            let inputDataRowData: string[] = inputDataRows[i].trim().split(/[ ]+/);
            //n: number of jobs, m: number of machines
            if (inputDataRowData.length == 2) {
                numberOfJobs = inputDataRowData[0];
                numberOfMachines = inputDataRowData[1];
            }
            //creating jobs
            else if (inputDataRowData.length == 3) {
                let job = new Job(inputDataRowData[0], Number(inputDataRowData[1]), Number(inputDataRowData[2]));
                this.jobs.push(job);
            }
        }
        //creating machines
        for (let i = 0; i < numberOfMachines; i++) {
            this.machines.push(new Machine(i + ""));
        }

    }
}