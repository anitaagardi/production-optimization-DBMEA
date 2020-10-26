import { ONE_BENCHMARK } from "../constants";
import { dbmea } from "../Algorithms/Optimization/dbmea";
import { bacterialMutation } from "../Algorithms/Operators/DBMEA/Bacterial_Mutation/bacterialMutation";
import { coherentSegmentMutation } from "../Algorithms/Operators/DBMEA/Bacterial_Mutation/coherentSegmentMutation";
import { looseSegmentMutation } from "../Algorithms/Operators/DBMEA/Bacterial_Mutation/looseSegmentMutation";
import { geneTransfer } from "../Algorithms/Operators/DBMEA/Gene_Transfer/geneTransfer";
import { geneTransferMutation } from "../Algorithms/Operators/DBMEA/Gene_Transfer/geneTransferMutation";
import { threeOpt } from "../Algorithms/Operators/DBMEA/threeOpt";
import { all_segments, twoOpt } from "../Algorithms/Operators/DBMEA/twoOpt";
import { BenchmarkReader } from "../File/BenchmarkReader";
import { Solution } from "../Model/solution";
import { isPermutation } from "./isPermutation";
import { mockPermutationPopulation, mockSolutionPopulation } from "./mockData";

console.log = jest.fn();
test('twoOpt test - is permutation?', () => {
    Solution.benchmarkReader = new BenchmarkReader();
    Solution.benchmarkReader.readOne(ONE_BENCHMARK);
    let solution: Solution = mockSolutionPopulation()[0];
    let twoOptResult: Solution = twoOpt(solution);
    let isTwoOptResultPermutation: boolean = isPermutation(twoOptResult.permutation);
    expect(isTwoOptResultPermutation).toBe(true);

});

test('threeOpt test - is permutation?', () => {
    Solution.benchmarkReader = new BenchmarkReader();
    Solution.benchmarkReader.readOne(ONE_BENCHMARK);
    let solution: Solution = mockSolutionPopulation()[0];
    let threeOptResultSolution: Solution = threeOpt(solution);
    let isThreeOptResultPermutation: boolean = isPermutation(threeOptResultSolution.permutation);
    expect(isThreeOptResultPermutation).toBe(true);

});

test('coherent segment mutation operator test - is permutation?', () => {
    Solution.benchmarkReader = new BenchmarkReader();
    Solution.benchmarkReader.readOne(ONE_BENCHMARK);
    let solution: Solution = mockSolutionPopulation()[0];
    let coherentSegmentResultSolution: Solution = coherentSegmentMutation(solution, 1, 4, 3);
    let isCoherentSegmentResultPermutation: boolean = isPermutation(coherentSegmentResultSolution.permutation);
    expect(isCoherentSegmentResultPermutation).toBe(true);
});

test('loose segment mutation operator test - is permutation?', () => {
    Solution.benchmarkReader = new BenchmarkReader();
    Solution.benchmarkReader.readOne(ONE_BENCHMARK);
    let solution: Solution = mockSolutionPopulation()[0];
    let looseSegmentResultSolution: Solution = looseSegmentMutation(solution, 1, 4);
    let isLooseSegmentResultPermutation: boolean = isPermutation(looseSegmentResultSolution.permutation);
    expect(isLooseSegmentResultPermutation).toBe(true);
});

test('bacterial mutation test - is permutation?', () => {
    Solution.benchmarkReader = new BenchmarkReader();
    Solution.benchmarkReader.readOne(ONE_BENCHMARK);
    let solutions: Solution[] = mockSolutionPopulation();
    let bacterialMutationResultSolutions: Solution[] = bacterialMutation(solutions, 10, 4);
    bacterialMutationResultSolutions.map((bacterialSolution) => {
        let isBacterialResultPermutation: boolean = isPermutation(bacterialSolution.permutation);
        expect(isBacterialResultPermutation).toBe(true);
    })

});
test('gene transfer mutation test - is permutation?', () => {
    let sourceSolution: Solution = mockSolutionPopulation()[0];
    let destinationSolution: Solution = mockSolutionPopulation()[1];
    let geneTransferResultSolution: Solution = geneTransferMutation(sourceSolution, destinationSolution, 2, 4, 1);
    let isGeneTransferResultPermutation: boolean = isPermutation(geneTransferResultSolution.permutation);
    expect(isGeneTransferResultPermutation).toBe(true);
});


test('gene transfer test - is permutation?', () => {
    Solution.benchmarkReader = new BenchmarkReader();
    Solution.benchmarkReader.readOne(ONE_BENCHMARK);
    let solutions: Solution[] = mockSolutionPopulation();
    let geneTransferResultSolutions: Solution[] = geneTransfer(solutions, 10, 4);
    geneTransferResultSolutions.map((geneTransferSolution) => {
        let isGeneTransferResultPermutation: boolean = isPermutation(geneTransferSolution.permutation);
        expect(isGeneTransferResultPermutation).toBe(true);
    })
});

test('dbmea test - is permutation?', () => {
    Solution.benchmarkReader = new BenchmarkReader();
    Solution.benchmarkReader.readOne(ONE_BENCHMARK);
    let dbmeaResultSolution: Solution = dbmea(10, 10, 10, 10, 3, 3);
    let isDBMEAResultSolutionPermutation: boolean = isPermutation(dbmeaResultSolution.permutation);
    expect(isDBMEAResultSolutionPermutation).toBe(true);
});


test('allSegments test', () => {
    let permutation: number[] = mockPermutationPopulation()[0];
    let allSegmentsResult: number[][] = all_segments(permutation.length);
    expect(allSegmentsResult).not.toBe(undefined);
    expect(allSegmentsResult.length).not.toBe(0);
});