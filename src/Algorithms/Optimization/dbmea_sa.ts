import { Solution } from "../../Model/solution";
import { bacterialMutation } from "../Operators/DBMEA/Bacterial_Mutation/bacterialMutation";
import { geneTransfer } from "../Operators/DBMEA/Gene_Transfer/geneTransfer";
import { threeOpt } from "../Operators/DBMEA/threeOpt";
import { twoOpt } from "../Operators/DBMEA/twoOpt";
import { sa } from "./sa";
/**
 * The discrete bacterial memetic evolutionary algorithm (DBMEA) with simulated annealing (SA)
 * @param {number} dbmea_n_ind the number of bacteria in the population ie the size of the population (DBMEA)
 * @param {number} dbmea_termination_criteria  the number of unimproved iterations cannot exceed (DBMEA)
 * @param {number} dbmea_n_clones the number of clones, ie the number of created solution (permutation) in bacterial mutation operator (DBMEA)
 * @param {number} dbmea_n_inf the number of infections in the gene transfer, ie the number of created bacteria (new permutation) in the gene transfer (DBMEA)
 * @param {number} dbmea_i_seg the length of the segment in bacterial mutation (DBMEA)
 * @param {number} dbmea_i_trans the length of the transferred segment in genetransfer operator (DBMEA)
 * @param {number} sa_termination_criteria  the number of unimproved iterations cannot exceed (SA)
 * @param {number} sa_temperature the temperature (determines the probability of accepting worse neighbour solution) (SA)
 * @param {number} sa_alpha the alpha (the decreasion of the temperature) (SA)
 * @param {number} sa_length the length (in a given length the temperature remain the same) (SA)
 * @param {number} sa_opt_number wheather 2 or 3-opt move is applied (SA)
 * @returns {Solution} the best solution created with DBMEA
 */

//REFACTORING??
export function dbmea_sa(dbmea_n_ind: number, dbmea_termination_criteria: number, dbmea_n_clones: number, dbmea_n_inf: number, dbmea_i_seg: number, dbmea_i_trans: number, sa_termination_criteria: number, sa_temperature: number, sa_alpha: number, sa_length: number, sa_opt_number: number): Solution {

    //creation and initialization of the population
    let population: Solution[] = [];
    for (let i = 0; i < dbmea_n_ind; i++) {
        population.push(new Solution());
    }
    if (dbmea_i_trans >= population[0].permutation.length) {
        console.log("Bad parameter setting, i_trans must be lower than the number of jobs");
        return population[0];
    }
    if (dbmea_i_seg >= population[0].permutation.length) {
        console.log("Bad parameter setting, i_seg must be lower than the number of jobs");
        return population[0];
    }
    let bestSolution: Solution = new Solution([...population[0].permutation]);
    let bestSolutionFitness: number = bestSolution.fitness();
    let notImprovedCount: number = 0;

    //termination criteria
    while (notImprovedCount < dbmea_termination_criteria) {
        //bacterial mutation
        population = bacterialMutation(population, dbmea_n_clones, dbmea_i_seg);
        //local search operation
        for (let i = 0; i < population.length; i++) {
            //twoOpt(population[i]);
            //threeOpt(population[i]);
            population[i] = sa(sa_termination_criteria, sa_temperature, sa_alpha, sa_length, sa_opt_number, population[i]);
        }
        //gene transfer
        population = geneTransfer(population, dbmea_n_inf, dbmea_i_trans);
        //the gene transfer sorts the population, so the first element will be the best
        let firstSolutionFitness: number = population[0].fitness();
        if (firstSolutionFitness < bestSolutionFitness) {
            process.stdout.write(bestSolutionFitness + " ");
            bestSolutionFitness = firstSolutionFitness;
            bestSolution.permutation = [...population[0].permutation];
            notImprovedCount = 0;
        } else {
            notImprovedCount++;
        }

    }
    process.stdout.write("\n");
    return bestSolution;

}