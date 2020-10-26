/**
 * 2-opt move: Reverse the segment 
 * @param {solution} Solution the solution (permutation)
 * @param {number} i the first edge index
 * @param {number} j the second edge index
 * @returns {Solution} the solution (which has the reversed segment)
 */

import { Solution } from "../../../Model/solution";
import { globalRandomGenerator } from "../../Permutation/permutationGenerator";
import { reverseBetween } from "../DBMEA/reverse";

export function twoOptMove(solution: Solution): Solution {
    let i: number = Math.floor(globalRandomGenerator() * solution.permutation.length);
    let j: number = Math.floor(globalRandomGenerator() * solution.permutation.length);
    let permutation = reverseBetween([...solution.permutation], i, i + j);
    let result1: Solution = new Solution(permutation);
    return result1;
}