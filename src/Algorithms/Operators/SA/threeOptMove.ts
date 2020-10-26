/**
 * 3-opt move: Reverse the segment
 * @param {solution} Solution the solution (permutation)
 * @param {number} i the first edge index
 * @param {number} j the second edge index
 * @param {number} k the third edge index
 * @returns {Solution} the created solution (which has the reversed segment)
 */

import { Solution } from "../../../Model/solution";
import { globalRandomGenerator } from "../../Permutation/permutationGenerator";
import { reverseBetween } from "../DBMEA/reverse";

export function threeOptMove(solution: Solution): Solution {

    //There are 6 points (3 edges)
    //There are 4 combinations and the unchanged solution
    let i: number = Math.floor(globalRandomGenerator() * solution.permutation.length);
    let j: number = Math.floor(globalRandomGenerator() * solution.permutation.length);
    let k: number = Math.floor(globalRandomGenerator() * solution.permutation.length);

    let permutation = reverseBetween([...solution.permutation], i, i + j);
    let result1: Solution = new Solution(permutation);
    permutation = reverseBetween([...solution.permutation], j, j + k);
    let result2: Solution = new Solution(permutation);
    permutation = reverseBetween([...solution.permutation], i, i + k);
    let result3: Solution = new Solution(permutation);
    permutation = reverseBetween([...solution.permutation], j, j + k);
    let result4: Solution = new Solution(permutation);

    //generate a random number (which reversed solution is returned)
    let returnedResultIndex = Math.floor(globalRandomGenerator() * 4);
    switch (returnedResultIndex) {
        case 0:
            return result1;
        case 1:
            return result2;
        case 2:
            return result3;
        case 3:
            return result4;
    }
    return solution;
}