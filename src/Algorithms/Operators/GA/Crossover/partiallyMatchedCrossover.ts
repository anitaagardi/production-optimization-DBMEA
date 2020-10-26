import { Solution } from "../../../../Model/solution";
import { globalRandomGenerator } from "../../../Permutation/permutationGenerator";

/**
 * The partially matched crossover operator. Creates 2 children solutions from 2 parent solutions
 * @param {Solution[]} parents the parent solutions
 * @returns {Solution[]} the two children solution
 */
export function partiallyMatchedCrossover(parents: Solution[]): Solution[] {
    //creating the fitting section
    let positions: number[] = [0, 0];

    let numTaks = parents[0].permutation.length;
    do {
        positions[0] = Math.floor(globalRandomGenerator() * numTaks);
        positions[1] = Math.floor(globalRandomGenerator() * numTaks);

    } while (positions[0] == positions[1]);
    if (positions[0] > positions[1]) {
        let tmp: number = positions[0];
        positions[0] = positions[1];
        positions[1] = tmp;
    }

    let pairs: number[][] = arrayCreator(positions[1] - positions[0], 2);
    let offspring: Solution[] = [];
    //creating copy from the parents, initially these will be the offsprings
    offspring[0] = new Solution(parents[0].permutation);
    offspring[1] = new Solution(parents[1].permutation);

    let jj: number = 0;
    //creating pairs in the fitting sections (these will be changed in the offsprings)
    for (let i: number = positions[0]; i < positions[1]; i++) {
        pairs[jj][0] = offspring[0].permutation[i];
        pairs[jj][1] = offspring[1].permutation[i];
        jj++;
    }
    //the change index of the first offsping
    let indexChanges: number[] = [0, 0, 0, 0];
    //the change index of the second offspring
    for (let i: number = 0; i < pairs.length; i++) {
        indexChanges[0] = offspring[0].permutation.indexOf(pairs[i][0]);
        indexChanges[1] = offspring[0].permutation.indexOf(pairs[i][1]);
        indexChanges[2] = offspring[1].permutation.indexOf(pairs[i][0]);
        indexChanges[3] = offspring[1].permutation.indexOf(pairs[i][1]);
        //changing the pairs in the first offspring
        let tmp: number = offspring[0].permutation[indexChanges[0]];
        offspring[0].permutation[indexChanges[0]] = offspring[0].permutation[indexChanges[1]];
        offspring[0].permutation[indexChanges[1]] = tmp;
        //changing the pairs in the second offspring
        tmp = offspring[1].permutation[indexChanges[2]];
        offspring[1].permutation[indexChanges[2]] = offspring[1].permutation[indexChanges[3]];
        offspring[1].permutation[indexChanges[3]] = tmp;
    }
    return offspring;

}


//array creation in typescript
export const arrayCreator = (firstIndex: number, secondIndex: number): number[][] => {
    let createdArray: number[][];
    createdArray = [];
    for (let i: number = 0; i < firstIndex; i++) {
        createdArray[i] = [];
        for (let j: number = 0; j < secondIndex; j++) {
            createdArray[i][j] = -1;
        }
    }
    return createdArray;
}


