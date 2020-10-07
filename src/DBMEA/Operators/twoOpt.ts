import { Solution } from "../../Model/solution";
import { reverseBetween } from "./reverse";

/**
 * Iterative improvement based on 2 exchange, returns the best permutation (solution)
 * @param {Solution} solution the solution, which must be improved with the operator
 * @returns {Solution} the best permutation (solution)
 */

export function twoOpt(solution: Solution): Solution {
    if (solution.permutation.length < 3) {
        return solution;
    }
    while (true) {
        let delta: number = 0;
        let allSegments: number[][] = all_segments(solution.permutation.length);

        for (let i = 0; i < allSegments.length; i++) {

            delta += reverse_segment_if_better(solution, allSegments[i][0], allSegments[i][1]);
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
 * @returns {number} the degree of improvement 
 */

export function reverse_segment_if_better(solution: Solution, i: number, j: number) {

    let result0: Solution = new Solution([...solution.permutation]);
    let permutation = reverseBetween([...solution.permutation], i, i + j);
    let result1: Solution = new Solution(permutation);
    let fitness0 = result0.fitness();
    let fitness1 = result1.fitness();
    if (fitness0 > fitness1) {
        solution.permutation = [...result1.permutation];
        return - fitness0 + fitness1;
    };

    return 0;
}
/**
 * Generate all segments combinations, returns the segments
 * @param {number} n the number of bacteria in the population ie the size of the population
 * @returns {number[][]} segments
 */
export function all_segments(n: number): number[][] {
    let segments: number[][] = [];
    for (let i = 0; i < n; i++) {
        for (let j = i + 2; j < n; j++) {
            segments.push([i, j]);
        }
    }
    return segments;
}

