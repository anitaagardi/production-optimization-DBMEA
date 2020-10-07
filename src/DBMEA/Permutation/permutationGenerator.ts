import * as seedrandom from "seedrandom";
/**
 * Generation a permutation with size length 
 * @param {number} size the length of the permutation
 * @returns {number} a random permutation with size length
 */
export function permutationGenerator(size: number): number[] {
    let randomNumbers: number[] = [];
    let permutation: number[] = [];
    let rng = seedrandom('hello.')
    //create random numbers
    for (let i = 0; i < size; i++) {
        randomNumbers[i] = rng();
    }
    //sort the numbers
    let sortedRandomNumbers = [...randomNumbers].sort();
    for (let j = 0; j < randomNumbers.length; j++) {
        //push the  index of the random number in the sorted list
        permutation.push(sortedRandomNumbers.indexOf(randomNumbers[j]));
        continue;
    }
    return permutation;
}