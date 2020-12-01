/**
 * swaps two random items in the population 
 * @param {solution} Solution the solution (permutation)
 * @param {number} i the first edge index
 * @param {number} j the second edge index
 * @returns {Solution} the solution (which has the reversed segment)
 */

import { Solution } from "../../../Model/solution";
import { globalRandomGenerator } from "../../Permutation/permutationGenerator";

export function swapMove(solution: Solution): Solution {
    let i: number = Math.floor(globalRandomGenerator() * solution.permutation.length);
    let j: number = Math.floor(globalRandomGenerator() * solution.permutation.length);
    const permutation = [...solution.permutation];
    let temp = permutation[i];
    permutation[i] = permutation[j];
    permutation[j] = temp;
    let result1: Solution = new Solution(permutation);
    return result1;
}