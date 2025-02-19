import { exception } from "console";
import { Solution } from "../../Model/solution";
import { swapMove } from "../Operators/SA/swapMove";
import { threeOptMove } from "../Operators/SA/threeOptMove";
import { twoOptMove } from "../Operators/SA/twoOptMove";
import { globalRandomGenerator } from "../Permutation/permutationGenerator";

/**
 * The simulated annealing algorithm (SA)
 * @param {number} termination_criteria  the number of unimproved iterations cannot exceed
 * @param {number} temperature the temperature (determines the probability of accepting worse neighbour solution)
 * @param {number} alpha the alpha (the decreasion of the temperature)
 * @param {number} length the length (in a given length the temperature remain the same)
 * @param {number} opt_number wheather 2 or 3-opt move is applied
 * @param {number} initial_solution  the initial solution (optional)
 * @returns {Solution} the best solution created with SA
 */
export function sa(termination_criteria: number, temperature: number, alpha: number, length: number, opt_number: number, initial_solution: Solution = new Solution(), isPrintFitnesses: boolean = false): Solution {
    if ((opt_number != 2) && (opt_number != 3) && (opt_number != 4)) {
        throw new exception("Only the 2-opt and 3-opt and 4-simpleSwap moves are implemented");
    }
    let actualSolution: Solution = initial_solution;
    let neighbourSolution: Solution = new Solution();
    let bestSolution: Solution = new Solution();
    let bestSolutionFitness: number = bestSolution.fitness();
    let notImprovedCount: number = 0;

    while (notImprovedCount < termination_criteria) {
        //length property: in a given length will remain the temperature the same
        for (let l = 0; l < length; l++) {
            if (opt_number == 2) {
                neighbourSolution = twoOptMove(actualSolution);
            } else if (opt_number == 3) {
                neighbourSolution = threeOptMove(actualSolution);
            } else if (opt_number == 4) {
                neighbourSolution = swapMove(actualSolution);
            }

            // calculate fittness if it was not caltulated before
            if (actualSolution.fitnessValue == Number.MAX_SAFE_INTEGER) {
                actualSolution.fitness();
            }

            let delta: number = neighbourSolution.fitness() - actualSolution.fitnessValue;
            //if the neighbour is better than the actual solution
            if (delta <= 0) {
                actualSolution.permutation = [...neighbourSolution.permutation];
                actualSolution.fitnessValue = neighbourSolution.fitnessValue;
                let deltaBestAndActual = neighbourSolution.fitnessValue - bestSolutionFitness;
                //if the neighbour is better than the ever best
                if (deltaBestAndActual < 0) {
                    if (isPrintFitnesses) {
                        process.stdout.write("[" + bestSolutionFitness + "] ");
                    }
                    bestSolution.permutation = [...neighbourSolution.permutation];
                    bestSolution.fitnessValue = neighbourSolution.fitnessValue;
                    bestSolutionFitness = neighbourSolution.fitnessValue;
                    notImprovedCount = 0;
                } else {
                    notImprovedCount++;
                }
            }
            //if the neighbour is not better we can accept it with a probability
            else if (Math.exp(-delta / temperature) > globalRandomGenerator()) {
                actualSolution.permutation = [...neighbourSolution.permutation];
                actualSolution.fitnessValue = neighbourSolution.fitnessValue;
            }
        }
        //the probability of accepting neighbours with worse fitness is decreasing along the iteration (but in a given length will remain the temperature the same)
        temperature = alpha * temperature;
    }
    if (isPrintFitnesses) {
        process.stdout.write("\n");
    }
    return bestSolution;
}