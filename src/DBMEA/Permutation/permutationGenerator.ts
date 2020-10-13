import * as seedrandom from "seedrandom";
import { BenchmarkReader } from "../../File/benchmarkReader";
let rng = seedrandom('hello.');
/**
 * Generation a permutation with size length 
 * @param {number} size the length of the permutation
 * @returns {number} a random permutation with size length
 */
export function permutationGenerator(size: number): number[] {
    let randomNumbers: number[] = [];
    let permutation: number[] = [];
    
    //create random numbers
    for (let i = 0; i < size; i++) {
        randomNumbers[i] = rng();
    }
    //sort the numbers
    let sortedRandomNumbers = [...randomNumbers].sort();
    for (let j = 0; j < randomNumbers.length; j++) {
        //push the  index of the random number in the sorted list
        permutation.push(sortedRandomNumbers.indexOf(randomNumbers[j]));
    }
    return permutation;
}

/**
 * Generation a starting permutation with heuristics
 * @param {benchMarkReader} benchMarkReader
 * @returns {number} [0,1,2,3..length]
 */
export function startPermutationGenerator(benchMarkReader: BenchmarkReader): number[] {
    let permutation: number[] = [];
    
    // asc order of due dates
    benchMarkReader.jobs = benchMarkReader.jobs.sort((a, b) => (a.dueDate < b.dueDate ? -1 : 1));
    
    for (let j = 0; j < benchMarkReader.jobs.length; j++) {
        permutation.push(j);
    }
    return permutation;
}