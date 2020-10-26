import { Solution } from "../../../../Model/solution";
import { globalRandomGenerator } from "../../../Permutation/permutationGenerator";
/**
 * The mutation operator of the Genetic Algorithm.
 * @param {Solution} offspring the offspring (which will be mutated)
 * @returns {Solution} the mutated solution
 */
export function mutation(offspring: Solution): Solution {
    let positions: number[] = [0, 0];

    let numTasks = offspring.permutation.length;
    do {
        positions[0] = Math.floor(globalRandomGenerator() * numTasks);
        positions[1] = Math.floor(globalRandomGenerator() * numTasks);
    } while (positions[0] == positions[1]);
    let j: number = positions[1];
    for (let i: number = positions[0]; i < positions[1]; i++) {
        let tmp: number = offspring.permutation[i];
        offspring.permutation[i] = offspring.permutation[j];
        offspring.permutation[j] = tmp;
        j--;
    }
    return offspring;
}