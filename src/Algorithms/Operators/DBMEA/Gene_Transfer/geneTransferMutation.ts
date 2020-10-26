import { Solution } from "../../../../Model/solution";

/**
 * The gene transfer mutation operator, returns the gene transferred solution
 * @param {Solution} sourceSolution a randomly selected bacterium (solution) of the superior part
 * @param {Solution} destinationSolution a randomly selected bacterium (permutation) of the inferior part
 * @param {number[]} sourceSegmentStart the start of the source segment in the source permutation
 * @param {number[]} sourceSegmentLength the length of the source segment in the source permutation
 * @param {number[]} destinationPosition the position of the segment in the destination permutation
 * @returns {Solution} gene transferred solution
 */
export function geneTransferMutation(sourceSolution: Solution, destinationSolution: Solution, sourceSegmentStart: number, sourceSegmentLength: number, destinationPosition: number): Solution {
    let sourcePermutation = sourceSolution.permutation;
    let destinationPermutation = destinationSolution.permutation;
    if (destinationPosition > destinationPermutation.length - 1) {
        return new Solution(destinationPermutation);
    }
    if ((sourceSegmentStart + sourceSegmentLength) > sourcePermutation.length - 1) {
        return new Solution(destinationPermutation);
    }
    let createdDestinationPermutation: number[] = [];
    createdDestinationPermutation = [...destinationPermutation];
    let pushedPermutationSegment: number[] = sourcePermutation.slice(sourceSegmentStart, sourceSegmentStart + sourceSegmentLength);

    //push the source segment to the destination permutation
    for (let i = 0; i < pushedPermutationSegment.length; i++) {
        createdDestinationPermutation.splice(destinationPosition, 0, pushedPermutationSegment[i]);
    }
    //remove the segment elements from the destination array in order to not duplicate the elements
    for (let i = 0; i < pushedPermutationSegment.length; i++) {
        //remove the elements after the pushed segment (if exists)
        const index = createdDestinationPermutation.indexOf(pushedPermutationSegment[i], destinationPosition + sourceSegmentLength);
        if (index > -1) {
            createdDestinationPermutation.splice(index, 1);
        } else {
            //remove the element before the pushed segment (if exists)
            const index = createdDestinationPermutation.indexOf(pushedPermutationSegment[i], 0);
            if (index > -1) {
                createdDestinationPermutation.splice(index, 1);
            }
        }
    }
    return new Solution(createdDestinationPermutation);

}