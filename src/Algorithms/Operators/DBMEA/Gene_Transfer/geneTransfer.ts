import { Solution } from "../../../../Model/solution";
import { globalRandomGenerator } from "../../../Permutation/permutationGenerator";
import { geneTransferMutation } from "./geneTransferMutation";
/**
 * The gene transfer operator, returns the gene transferred population
 * @param {Solution[]} population the population (ie the solutions)
 * @param {number} n_inf the number of infections in the gene transfer, ie the number of created bacteria (new permutation) in the gene transfer
 * @param {number} i_trans the length of the transferred segment in genetransfer operator
 * @returns {Solution[]} the gene transferred population
 */
export function geneTransfer(population: Solution[], n_inf: number, i_trans: number): Solution[] {
    //sort the population based on the fitness values
    let sortedPopulation: Solution[] = population.sort((a: Solution, b: Solution) => {
        return a.fitnessValue - b.fitnessValue;
    })
    //divide the sorted population into two parts (superior and inferior part)
    let superiorPopulation: Solution[] = sortedPopulation.slice(0, Math.floor(sortedPopulation.length / 2));
    let inferiorPopulation: Solution[] = sortedPopulation.slice(Math.floor(sortedPopulation.length / 2) + 1);
    let geneTransferrredPopulation: Solution[] = [];
    //gene transfer n_inf times
    for (let i = 0; i < n_inf; i++) {
        //the gene transfer mutation based on the randomly selected superior and inferior bacterien
        let randomSuperiorBacterium: Solution = superiorPopulation[Math.floor(globalRandomGenerator() * superiorPopulation.length)];
        let randomInferiorBacterium: Solution = inferiorPopulation[Math.floor(globalRandomGenerator() * inferiorPopulation.length)];
        geneTransferrredPopulation.push(geneTransferMutation(randomSuperiorBacterium, randomInferiorBacterium, Math.floor(globalRandomGenerator() * randomInferiorBacterium.permutation.length), i_trans, Math.floor(globalRandomGenerator() * randomInferiorBacterium.permutation.length)));
    }
    //push the created gene transferred population into the sorted population
    geneTransferrredPopulation.map((geneTransferrredPermutation) => {
        geneTransferrredPermutation.fitness();
        sortedPopulation.push(geneTransferrredPermutation);
    })
    //sort the population
    sortedPopulation = sortedPopulation.sort((a: Solution, b: Solution) => {
        return a.fitnessValue - b.fitnessValue;
    })
    //return with the best elements (after the operation) of the population
    //the length of the population must remain the same
    return sortedPopulation.slice(0, population.length);


}