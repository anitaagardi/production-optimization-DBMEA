import { Solution } from "../Model/solution";

export function mockPermutationPopulation(): number[][] {
    let population: number[][] = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        [1, 0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        [1, 2, 0, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        [6, 2, 5, 1, 0, 4, 3, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        [5, 2, 1, 6, 0, 4, 3, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        [3, 7, 8, 9, 5, 2, 1, 6, 0, 4, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        [9, 5, 2, 1, 3, 7, 8, 6, 0, 4, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        [4, 3, 7, 8, 9, 5, 2, 1, 6, 0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        [5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        [6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        [6, 1, 0, 2, 5, 4, 3, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    ]
    return population;
}
export function mockSolutionPopulation(): Solution[] {
    let population: Solution[] = [];
    let permutations: number[][] = mockPermutationPopulation();
    for (let i = 0; i < permutations.length; i++) {
        population.push(new Solution(permutations[i]));
    }
    return population;
}