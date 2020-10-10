import { permutationGenerator } from "../DBMEA/Permutation/permutationGenerator";
import { BenchmarkReader } from "../File/BenchmarkReader";
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
            this.permutation = permutationGenerator(Solution.benchmarkReader.jobs.length);
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
                actualFitnessValue = actualFitnessValue + actualJobMachineAssignment[i].dueDate;
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
    //this fitness function is in use
    //this fintess calculation strategy needs a bit modification
    //in order to reach the algorithm the best known solution of the benchmark data
    fitness(): number {

        this.fitnessValue = 0;
        let actualMachineIndex = 0;
        this.machines = [];
        this.machines.push(new Machine((actualMachineIndex + 1) + ''));

        for (let i = 0; i < this.permutation.length; i++) {
            let jobIndex = this.permutation[i];
            let freeTime = this.machines[actualMachineIndex].actualFreeTime + Solution.benchmarkReader.jobs[jobIndex].processingTime;
            //if due date constraint is met, push the job
            if (freeTime < Solution.benchmarkReader.jobs[jobIndex].dueDate) {
                this.machines[actualMachineIndex].pushJob(Solution.benchmarkReader.jobs[jobIndex]);
            }
            //if due date constraint is not met, create a new machine (if can) and assing the job to the machine
            else if (actualMachineIndex < Solution.benchmarkReader.machines.length - 1) {
                actualMachineIndex++;
                this.machines.push(new Machine((actualMachineIndex + 1) + ''));
                this.machines[actualMachineIndex].pushJob(Solution.benchmarkReader.jobs[jobIndex]);
            }
            //assign the job to the machine, but it has due date
            else {
                let minActualFreeTimeIndex = 0;
                //search for a machine, which has the minimal jobs time (actual free time value)
                for (let j = 1; j < this.machines.length; j++) {
                    if (this.machines[j].actualFreeTime < this.machines[minActualFreeTimeIndex].actualFreeTime) {
                        minActualFreeTimeIndex = j;
                    }
                }
                this.machines[minActualFreeTimeIndex].pushJob(Solution.benchmarkReader.jobs[jobIndex]);
            }

        }

        for (let i = 0; i < this.machines.length; i++) {
            this.fitnessValue = this.fitnessValue + this.machines[i].dueDate;
        }
        return this.fitnessValue;
    }

}