import { Solution } from "../../Model/solution";
import { cycleCrossover } from "../Operators/GA/Crossover/cycleCrossover";
import { orderCrossover } from "../Operators/GA/Crossover/orderCrossover";
import { partiallyMatchedCrossover } from "../Operators/GA/Crossover/partiallyMatchedCrossover";
import { mutation } from "../Operators/GA/Mutation/mutation";
import { rouletteWheel } from "../Operators/GA/rouletteWheel";
import { globalRandomGenerator } from "../Permutation/permutationGenerator";
/**
 * The genetic algorithm (GA)
 * @param {number} termination_criteria  the number of unimproved iterations cannot exceed
 * @param {number} population_size the number of population, ie the number of created solution
 * @param {number} elitism_rate the number of elements (solutions) in the population which is transferred unaltered to the next population
 * @param {number} ox_rate the probability of ordered crossover (OX)
 * @param {number} pmx_rate the probability of partially matched crossover (PMX)
 * @param {number} cx_rate the probability of cycle crossover (CX)
 * @param {number} mutation_rate the probability of mutation
 * @returns {Solution} the best solution created with GA
 */
export function ga(termination_criteria: number, population_size: number, elitism_rate: number, ox_rate: number, pmx_rate: number, cx_rate: number, mutation_rate: number): Solution {


    let previousPopulation: Solution[] = [];
    for (let i = 0; i < population_size; i++) {
        previousPopulation.push(new Solution());
    }

    let nextPopulation: Solution[] = [];
    for (let i = 0; i < population_size; i++) {
        nextPopulation.push(new Solution());
    }
    let bestSolution: Solution = new Solution([...previousPopulation[0].permutation]);
    let bestSolutionFitness: number = bestSolution.fitness();
    let notImprovedCount: number = 0;

    while (notImprovedCount < termination_criteria) {
        let fitnessValues: number[] = [];
        for (let j: number = 0; j < previousPopulation.length; j++) {
            fitnessValues.push(previousPopulation[j].fitness());
        }
        let sortedFitnessValues: number[] = [];
        sortedFitnessValues = [...fitnessValues].sort((n1, n2) => n1 - n2);
        //the best solutions will be transfered to the next population unaltered
        for (let j: number = 0; j < elitism_rate; j++) {
            let elitismFitness: number = sortedFitnessValues[j];
            let index: number = fitnessValues.indexOf(elitismFitness);
            nextPopulation[j].permutation = [...previousPopulation[index].permutation];
        }
        let populationIndex: number = elitism_rate;
        //uploading the next population
        while (populationIndex < population_size) {
            //determining the two parents with roulette wheel method
            let parentsIndex: number[] = rouletteWheel(fitnessValues);
            let parents: Solution[] = [];
            parents[0] = previousPopulation[parentsIndex[0]];
            parents[1] = previousPopulation[parentsIndex[1]];
            let offspring: Solution[] = [];
            let crossoverRandom: number = globalRandomGenerator();
            //application one of the crossover based on probabilities, or copy unaltered the solution to the next generation
            if (crossoverRandom < ox_rate) {
                offspring = orderCrossover(parents);
            } else if (crossoverRandom > ox_rate && crossoverRandom < (pmx_rate + ox_rate)) {
                offspring = partiallyMatchedCrossover(parents);
            } else if (crossoverRandom > (pmx_rate + ox_rate) && crossoverRandom < (pmx_rate + ox_rate + cx_rate)) {
                offspring = cycleCrossover(parents);
            } else {

                for (let j: number = 0; j < 2; j++) {
                    offspring[j] = new Solution();
                    offspring[j].permutation = [...previousPopulation[parentsIndex[j]].permutation];

                }
            }

            //application of mutation in the created 2 offsprings, in a given probability
            let mutationRand: number = globalRandomGenerator();

            if (mutationRand < mutation_rate) {
                offspring[0] = mutation(offspring[0]);
            }
            mutationRand = globalRandomGenerator();
            if (mutationRand < mutation_rate) {
                offspring[1] = mutation(offspring[1]);
            }
            if (populationIndex < population_size) {
                nextPopulation[populationIndex] = offspring[0];
                populationIndex++;
            } if (populationIndex < population_size) {
                nextPopulation[populationIndex] = offspring[1];
                populationIndex++;
            }
            previousPopulation = nextPopulation;
        }
        fitnessValues = [];
        for (let j: number = 0; j < previousPopulation.length; j++) {
            fitnessValues.push(previousPopulation[j].fitness());
        }
        sortedFitnessValues = [];
        sortedFitnessValues = [...fitnessValues].sort((n1, n2) => n1 - n2);
        let firstSolutionFitness = sortedFitnessValues[0];
        let minIndex: number = fitnessValues.indexOf(firstSolutionFitness);
        if (firstSolutionFitness < bestSolutionFitness) {
            process.stdout.write(bestSolutionFitness + " ");
            bestSolutionFitness = firstSolutionFitness;
            bestSolution.permutation = [...previousPopulation[minIndex].permutation];
            notImprovedCount = 0;
        } else {
            notImprovedCount++;
        }
    }

    process.stdout.write("\n");
    return bestSolution;

}
