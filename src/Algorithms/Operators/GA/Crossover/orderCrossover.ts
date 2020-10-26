import { Solution } from "../../../../Model/solution";
import { globalRandomGenerator } from "../../../Permutation/permutationGenerator";
/**
 * The order crossover operator. Creates 2 children solutions from 2 parent solutions
 * @param {Solution[]} parents the parent solutions
 * @returns {Solution[]} the two children solution
 */
export function orderCrossover(parents: Solution[]): Solution[] {
    let positions: number[] = [0, 0];
    let offspring: Solution[] = [];

    offspring[0] = new Solution([]);
    offspring[1] = new Solution([]);
    let numTasks = parents[0].permutation.length;

    //create the two fitting section (randomly)
    do {
        positions[0] = Math.floor(globalRandomGenerator() * numTasks);
        positions[1] = Math.floor(globalRandomGenerator() * numTasks);

    } while (positions[0] == positions[1]);
    //change the positions (if needed)
    if (positions[0] > positions[1]) {
        let tmp: number = positions[0];
        positions[0] = positions[1];
        positions[1] = tmp;
    }
    //the actual uploading index of the first gene 
    let uploadingIndicies: number[] = [0, 0];

    //the actual uploading index of the second gene

    //create the fitting sections in the offsprings (copy unaltered from the parents)
    for (let i: number = positions[0]; i <= positions[1]; i++) {
        offspring[0].permutation[i] = parents[0].permutation[i];
        offspring[1].permutation[i] = parents[1].permutation[i];
    }

    for (let j: number = 0; j < numTasks; j++) {
        let isUploadings: boolean[] = [false, false];

        //creating the holes of the offsprings
        for (let i: number = positions[0]; i <= positions[1]; i++) {
            if (parents[0].permutation[i] == parents[1].permutation[j]) {
                isUploadings[0] = true;
            }
            if (parents[1].permutation[i] == parents[0].permutation[j]) {
                isUploadings[1] = true;
            }
        }
        //uploading the first offspring
        if (!isUploadings[0]) {
            //if the uploading index reaches the fitting section --> miss the fitting section
            if (uploadingIndicies[0] == positions[0]) {
                uploadingIndicies[0] = positions[1] + 1;
            }
            offspring[0].permutation[uploadingIndicies[0]] = parents[1].permutation[j];
            uploadingIndicies[0] = uploadingIndicies[0] + 1;
        }
        //uploading the second offspring
        if (!isUploadings[1]) {
            //if the uploading index reaches the fitting section --> miss the fitting section
            if (uploadingIndicies[1] == positions[0]) {
                uploadingIndicies[1] = positions[1] + 1;
            }
            offspring[1].permutation[uploadingIndicies[1]] = parents[0].permutation[j];
            uploadingIndicies[1] = uploadingIndicies[1] + 1;
        }
    }
    return offspring;

}