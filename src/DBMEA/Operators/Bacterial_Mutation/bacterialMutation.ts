import * as seedrandom from "seedrandom";
import { Solution } from "../../../Model/solution";
import { coherentSegmentMutation } from "./coherentSegmentMutation";
import { looseSegmentMutation } from "./looseSegmentMutation";
/**
 * The bacterial mutation, returns the population after the bacterial mutation
 *@param {Solution[]} population the permutations
 * @param {number} n_clones the number of clones, ie the number of created solution (permutation) in bacterial mutation operator
 * @param {number} i_seg the length of the segment in bacterial mutation
 * @returns {Solution[]} the population after the bacterial mutation
 */
export function bacterialMutation(population: Solution[], n_clones: number, i_seg: number): Solution[] {
    for (let i = 0; i < population.length; i++) {
        let rng = seedrandom('hello.');
        let r = rng();

        if (r <= 0.9) {
            //cut p into coherent segments
            let numberOfSegments = Math.floor(population[i].permutation.length / i_seg);
            //choose a not mutated part, and make the coherent segment mutation
            for (let j = 0; j < numberOfSegments; j++) {
                population[i] = coherentSegmentMutation(population[i], i_seg * j, i_seg, n_clones);
            }
        } else {
            //cut p into loose segments
            let numberOfSegments = Math.floor(population[i].permutation.length / i_seg);
            //choose a not mutated part, and make the loose segment mutation
            for (let j = 0; j < numberOfSegments; j++) {
                population[i] = looseSegmentMutation(population[i], i_seg, n_clones);
            }
        }
    }
    return population;
}