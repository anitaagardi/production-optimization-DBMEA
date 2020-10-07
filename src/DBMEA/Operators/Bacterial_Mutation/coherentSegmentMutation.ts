import { Solution } from "../../../Model/solution";
import { permutationGenerator } from "../../Permutation/permutationGenerator";
/**
 * the coherent segment mutation operator, returns the best permutation (the result of coherent segment mutation)
 * @param {Solution} solution the permutation (bacterium), which must be mutated
 * @param {number} segmentStart the start index of the segment, which must be changed in the permutation (bacterium)
 * @param {number} segmentLength  the length of the segment
 * @param {number} n_clones the number of clones, ie the number of created solution (permutation) in bacterial mutation operator
 * @returns {Solution} best solution (the result of coherent segment mutation)
 */
export function coherentSegmentMutation(solution: Solution, segmentStart: number, segmentLength: number, n_clones: number): Solution {
    //if the segment length is greater than the permutation
    if (segmentStart + segmentLength >= solution.permutation.length) {
        return solution;
    }
    //creation of the clone baterien
    let beforeSegment: number[] = solution.permutation.slice(0, segmentStart);
    let afterSegment: number[] = solution.permutation.slice(segmentStart + segmentLength);
    let segment: number[] = solution.permutation.slice(segmentStart, segmentStart + segmentLength);
    let createdBacterien: Solution[] = [];
    //the first clone has the reverse of the original segment
    let firstBacterium: Solution = new Solution([...beforeSegment].concat(segment.reverse(), ...afterSegment));
    createdBacterien.push(firstBacterium);
    //change randomly the order of vertices in the selected segment in the clones
    for (let i = 0; i < n_clones - 1; i++) {
        //the random order of segment
        let orderOfSegment = permutationGenerator(segment.length);
        let newBacteriumPermutation: number[] = [];
        let newBacteriumSegment: number[] = [];
        //creation of the random segment
        for (let j = 0; j < orderOfSegment.length; j++) {
            newBacteriumSegment.push(segment[orderOfSegment[j]]);
        }
        //the new bacterium will consist of the part of before the segment, the segment (in arbitrary order),
        //and the part after the segment
        newBacteriumPermutation.concat([...beforeSegment], [...newBacteriumSegment], [...afterSegment]);
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