import { startPermutationGenerator } from "../DBMEA/Permutation/permutationGenerator";
import { BenchmarkReader } from "../File/benchmarkReader";
import { Machine } from "./machine";
import { combinations } from "../DBMEA/Permutation/combination";
export class Solution {
    machines: Machine[] = [];
    permutation: number[] = [];
    fitnessValue: number = Number.MAX_SAFE_INTEGER;
    static benchmarkReader: BenchmarkReader = null;
    constructor(permutation?: number[]) {
        if (permutation) {
            this.permutation = permutation;
        }
        else {
            this.permutation = startPermutationGenerator(Solution.benchmarkReader);
        }

    }
    //this function is not in use (because it takes too long). It tries to create all of the possible "cuts" in the permutation
    //the "cuts" determines, which job is assigned to which machines
    fitness1(): number {
        if (this.fitnessValue != Number.MAX_SAFE_INTEGER) {
            return this.fitnessValue;
        }
        this.fitnessValue = 0;
        this.machines = [];
        //creates all possible "cuts"
        let combinationsArray: number[][] = combinations(this.permutation, Solution.benchmarkReader.machines.length - 1);
        let minFitnessValue = Number.MAX_SAFE_INTEGER;
        let minJobMachineAssignment: Machine[] = [];
        //creates all possible solutions based on the "cuts"
        for (let i = 0; i < combinationsArray.length; i++) {
            let actualFitnessValue: number = 0;
            let actualJobMachineAssignment: Machine[] = [];
            let actualMachineIndex = 0;
            let actualJobMachineAssignmentIndex = 0;
            actualJobMachineAssignment.push(new Machine('1'));
            for (let j = 0; j < this.permutation.length; j++) {
                //creation of a new machine based on the "cut"
                if (j > combinationsArray[i][actualJobMachineAssignmentIndex]) {
                    actualJobMachineAssignmentIndex++;
                    actualMachineIndex++;
                    actualJobMachineAssignment.push(new Machine((actualMachineIndex + 1) + ''));
                }
                let jobIndex = this.permutation[j];
                actualJobMachineAssignment[actualMachineIndex].pushJob(Solution.benchmarkReader.jobs[jobIndex]);
            }
            for (let i = 0; i < actualJobMachineAssignment.length; i++) {
                actualFitnessValue = actualFitnessValue + actualJobMachineAssignment[i].tardiness;
            }
            if (actualFitnessValue < minFitnessValue) {
                minFitnessValue = actualFitnessValue;
                minJobMachineAssignment = actualJobMachineAssignment;
            }


        }
        this.machines = minJobMachineAssignment;
        this.fitnessValue = minFitnessValue;
        return this.fitnessValue;
    }
    fitness(): number {
        this.fitnessValue = 0;
        this.machines = [];
        // create an empty machines vector
        for (let m = 0; m < Solution.benchmarkReader.machines.length; m++) {
            this.machines.push(new Machine((m + 1) + ''));
        }

        let machineIndex = 0;
        for (let i = 0; i < this.permutation.length; i++) {
            const jobIndex = this.permutation[i];

            this.machines[machineIndex].pushJob(Solution.benchmarkReader.jobs[jobIndex]);

            machineIndex++;
            if (machineIndex == Solution.benchmarkReader.machines.length) {
                machineIndex = 0;
            }
        }

        for (let i = 0; i < this.machines.length; i++) {
            this.fitnessValue = this.fitnessValue + this.machines[i].tardiness;
        }

        return this.fitnessValue;
    }
    //this fitness function is in use
    //this fintess calculation strategy needs a bit modification
    //in order to reach the algorithm the best known solution of the benchmark data
    fitness3(): number {

        this.fitnessValue = 0;
        let actualMachineIndex = 0;
        this.machines = [];

        // create an empty machines vector
        for (let m = 0; m < Solution.benchmarkReader.machines.length; m++) {
            this.machines.push(new Machine((m + 1) + ''));
        }

        let isMoreFreeTime = true;
        for (let i = 0; i < this.permutation.length; i++) {
            const jobIndex = this.permutation[i];

            // select the machine where the free time is the minimum and no due date -> assign job to it
            let minimumFreetimeMachineIndex = -1;
            if (isMoreFreeTime) {
                let miniumFreeTime = -1;
                for (let m = 0; m < this.machines.length; m++) {
                    if (this.machines[m].tardiness == 0) {
                        const actualFreeTime = this.machines[m].time;
                        if (actualFreeTime > miniumFreeTime) {
                            miniumFreeTime = actualFreeTime;
                            minimumFreetimeMachineIndex = m;
                        }
                    }
                }
                if (minimumFreetimeMachineIndex == -1) {
                    isMoreFreeTime = false;
                }
            }
            // we have at least one machine where there is no due date
            if (isMoreFreeTime) {
                this.machines[minimumFreetimeMachineIndex].pushJob(Solution.benchmarkReader.jobs[jobIndex]);
            } else {
                let maxFreeTime = -1000000;
                let minDueDateMachineIndex = 0;
                for (let m = 0; m < this.machines.length; m++) {
                    let currentFreeTime = Solution.benchmarkReader.jobs[jobIndex].dueDate -
                        (this.machines[m].time + Solution.benchmarkReader.jobs[jobIndex].processingTime);
                    if (currentFreeTime > maxFreeTime) {
                        maxFreeTime = currentFreeTime;
                        minDueDateMachineIndex = m;
                    }
                }
                this.machines[minDueDateMachineIndex].pushJob(Solution.benchmarkReader.jobs[jobIndex]);
            }
        }

        for (let i = 0; i < this.machines.length; i++) {
            this.fitnessValue = this.fitnessValue + this.machines[i].tardiness;
        }
        return this.fitnessValue;
    }

}