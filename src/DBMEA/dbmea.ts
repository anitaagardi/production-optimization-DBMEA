import { Solution } from "../Model/solution";
import { bacterialMutation } from "./Operators/Bacterial_Mutation/bacterialMutation";
import { geneTransfer } from "./Operators/Gene_Transfer/geneTransfer";
import { threeOpt } from "./Operators/threeOpt";
import { twoOpt } from "./Operators/twoOpt";
/**
 * The discrete bacterial memetic evolutionary algorithm (DBMEA)
 * @param {number} n_ind the number of bacteria in the population ie the size of the population
 * @param {number} termination_criteria  the number of unimproved iterations cannot exceed
 * @param {number} n_clones the number of clones, ie the number of created solution (permutation) in bacterial mutation operator
 * @param {number} n_inf the number of infections in the gene transfer, ie the number of created bacteria (new permutation) in the gene transfer
 * @param {number} i_seg the length of the segment in bacterial mutation
 * @param {number} i_trans the length of the transferred segment in genetransfer operator
 * @returns {Solution} the best solution created with DBMEA
 */
export function dbmea(n_ind: number, termination_criteria: number, n_clones: number, n_inf: number, i_seg: number, i_trans: number): Solution {

    //creation and initialization of the population
    let population: Solution[] = [];
    for (let i = 0; i < n_ind; i++) {
        population.push(new Solution());
    }
    if (i_trans >= population[0].permutation.length) {
        console.log("Bad parameter setting, i_trans must be lower than the number of jobs");
        return population[0];
    }
    if (i_seg >= population[0].permutation.length) {
        console.log("Bad parameter setting, i_seg must be lower than the number of jobs");
        return population[0];
    }
    let bestSolution: Solution = new Solution([...population[0].permutation]);
    let bestSolutionFitness: number = bestSolution.fitness();
    let notImprovedCount: number = 0;
    //termination criteria
    while (notImprovedCount < termination_criteria) {
        //bacterial mutation
        population = bacterialMutation(population, n_clones, i_seg);
        //local search operation
        for (let i = 0; i < population.length; i++) {
            twoOpt(population[i]);
            threeOpt(population[i]);
        }
        //gene transfer
        population = geneTransfer(population, n_inf, i_trans);
        //the gene transfer sorts the population, so the first element will be the best
        let firstSolutionFitness: number = population[0].fitness();
        if (firstSolutionFitness < bestSolutionFitness) {
            bestSolutionFitness = firstSolutionFitness;
            bestSolution.permutation = [...population[0].permutation];
            notImprovedCount = 0;
        } else {
            notImprovedCount++;
        }

    }
    return bestSolution;

}