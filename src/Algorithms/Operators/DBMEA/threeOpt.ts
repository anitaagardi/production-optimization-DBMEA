import { Solution } from "../../../Model/solution";
import { reverseBetween } from "./reverse";
/**
 * Iterative improvement based on 3 exchange, returns the best permutation (solution)
 * @param {Solution} solution the solution, which must be improved with the operator
 * @returns {Solution} the best permutation (solution)
 */

//https://en.wikipedia.org/wiki/3-opt

export function threeOpt(solution: Solution): Solution {
    if (solution.permutation.length < 4) {
        return solution;
    }
    while (true) {
        let delta: number = 0;
        let allSegments: number[][] = all_segments(solution.permutation.length);
        for (let i = 0; i < allSegments.length; i++) {
            delta += reverse_segment_if_better(solution, allSegments[i][0], allSegments[i][1], allSegments[i][3]);
        }
        if (delta >= 0) {
            break;
        }

    }
    return solution;
}

/**
 * Reverse the segment if it makes the permutation (solution) better
 * @param {solution} Solution the solution (permutation)
 * @param {number} i the first edge index
 * @param {number} j the second edge index
 * @param {number} k the third edge index
 * @returns {number} the degree of improvement 
 */

function reverse_segment_if_better(solution: Solution, i: number, j: number, k: number): number {

    //There are 6 points (3 edges)
    //There are 4 combinations and the unchanged solution

    //If any changes are better than the original solution

    let result0: Solution = new Solution([...solution.permutation]);

    let permutation = reverseBetween([...solution.permutation], i, i + j);
    let result1: Solution = new Solution(permutation);
    permutation = reverseBetween([...solution.permutation], j, j + k);
    let result2: Solution = new Solution(permutation);
    permutation = reverseBetween([...solution.permutation], i, i + k);
    let result3: Solution = new Solution(permutation);
    permutation = reverseBetween([...solution.permutation], j, j + k);
    let result4: Solution = new Solution(permutation);

    let fitness0 = result0.fitness();
    let fitness1 = result1.fitness();
    let fitness2 = result2.fitness();
    let fitness3 = result3.fitness();
    let fitness4 = result4.fitness();

    if (fitness0 > fitness1) {
        solution.permutation = [...result1.permutation];
        return -fitness0 + fitness1;
    }
    else if (fitness0 > fitness2) {
        solution.permutation = [...result2.permutation];
        return -fitness0 + fitness2;
    }
    else if (fitness0 > fitness3) {
        solution.permutation = [...result3.permutation];
        return -fitness0 + fitness3;
    }
    else if (fitness0 > fitness4) {
        solution.permutation = [...result4.permutation];
        return -fitness0 + fitness4;
    }
    return 0;
}
/**
 * Generate all segments combinations, returns the segments
 * @param {number} n the number of bacteria in the population ie the size of the population
 * @returns {number[][]} segments
 */
function all_segments(n: number): number[][] {
    let segments: number[][] = [];
    for (let i = 0; i < n; i++) {
        for (let j = i + 2; j < n; j++) {
            for (let k = j + 2; k < n; k++) {
                segments.push([i, j, k]);
            }
        }
    }
    return segments;
}

