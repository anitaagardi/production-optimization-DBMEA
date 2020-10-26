import { globalRandomGenerator } from "../../Permutation/permutationGenerator";

/**
 * The roulette wheel operator (the crossover operator uses this method to determine the parents)
 * @param {number[]} fitnessValues the fitness values of the population
 * @returns {number[]} the index of the two parents
 */
export function rouletteWheel(fitnessValues: number[]): number[] {
    let previousPopulationSize = fitnessValues.length;
    let parents: number[] = [-1, -1];
    let sumOfFitness: number = 0;
    for (let i: number = 0; i < previousPopulationSize; i++) {
        sumOfFitness += fitnessValues[i];
    }
    for (let i: number = 0; i < 2; i++) {
        let value: number = globalRandomGenerator() * sumOfFitness;
        for (let j: number = 0; j < previousPopulationSize; j++) {
            value -= fitnessValues[j];
            parents[i] = previousPopulationSize - 1;
            if (value <= 0) {
                parents[i] = j;
                break;
            }
        }
    }
    return parents;
}