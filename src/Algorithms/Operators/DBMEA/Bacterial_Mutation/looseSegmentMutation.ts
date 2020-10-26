import { Solution } from "../../../../Model/solution";
import { permutationGenerator } from "../../../Permutation/permutationGenerator";
/**
 * The loose segment mutation operator, returns the best permutation (the result of loose segment mutation)
 * @param {Solution} solution the solution (bacterium), which must be mutated
 * @param {number} segmentLength  the length of the segment
 * @param {number} n_clones the number of clones, ie the number of created solution (permutation) in bacterial mutation operator
 * @returns {Solution} the best solution (the result of loose segment mutation)
 */
export function looseSegmentMutation(solution: Solution, segmentLength: number, n_clones: number): Solution {
    //creation of the segment (randomly select segmentLengt indices)
    let segmentIndices: number[] = permutationGenerator(solution.permutation.length).slice(segmentLength);
    let segmentValues: number[] = [];
    //creation the segment values (based on the generated random segmentIndices)
    for (let i = 0; i < segmentIndices.length; i++) {
        segmentValues.push(solution.permutation[segmentIndices[i]]);
    }
    let createdBacterien: Solution[] = [];
    //the first clone has the reverse of the original segment
    let firstBacteriumPermutation: number[] = [...solution.permutation];
    let reversedSegmentValues = segmentValues.reverse();
    for (let j = 0; j < segmentIndices.length; j++) {
        firstBacteriumPermutation[segmentIndices[j]] = reversedSegmentValues[j];
    }
    createdBacterien.push(new Solution(firstBacteriumPermutation));
    //change randomly the order of vertices in the selected segment in the clones
    for (let i = 0; i < n_clones - 1; i++) {
        //the random order of segment
        let newBacteriumPermutation: number[] = [...solution.permutation];
        let orderOfSegment = permutationGenerator(segmentValues.length);
        //creation of the random segment
        for (let j = 0; j < orderOfSegment.length; j++) {
            newBacteriumPermutation[segmentIndices[j]] = segmentValues[orderOfSegment[j]];
        }
        createdBacterien.push(new Solution(newBacteriumPermutation));
    }
    //selecting the fittest from the clones
    let bestFitness: number = Math.max(), bestIndex: number = 0;
    for (let i = 0; i < createdBacterien.length; i++) {
        let actualBacteriumFitness = createdBacterien[i].fitness();
        if (actualBacteriumFitness < bestFitness) {
            bestFitness = actualBacteriumFitness;
            bestIndex = i;
        }
    }
    return createdBacterien[bestIndex];
}