import { threeOptMove } from "../Algorithms/Operators/SA/threeOptMove";
import { twoOptMove } from "../Algorithms/Operators/SA/twoOptMove";
import { sa } from "../Algorithms/Optimization/sa";
import { ONE_BENCHMARK } from "../constants";
import { BenchmarkReader } from "../File/benchmarkReader";
import { Solution } from "../Model/solution";
import { isPermutation } from "./isPermutation";
import { mockSolutionPopulation } from "./mockData";
test('2-opt move operator test - is permutation?', () => {
    Solution.benchmarkReader = new BenchmarkReader();
    Solution.benchmarkReader.readOne(ONE_BENCHMARK);
    let solution: Solution = mockSolutionPopulation()[0];
    let resultSolution: Solution = twoOptMove(solution);
    let isResultPermutation: boolean = isPermutation(resultSolution.permutation);
    expect(isResultPermutation).toBe(true);

});
test('3-opt move operator test - is permutation?', () => {
    Solution.benchmarkReader = new BenchmarkReader();
    Solution.benchmarkReader.readOne(ONE_BENCHMARK);
    let solution: Solution = mockSolutionPopulation()[0];
    let resultSolution: Solution = threeOptMove(solution);
    let isResultPermutation: boolean = isPermutation(resultSolution.permutation);
    expect(isResultPermutation).toBe(true);

});
test('sa test - is permutation?', () => {
    Solution.benchmarkReader = new BenchmarkReader();
    Solution.benchmarkReader.readOne(ONE_BENCHMARK);
    let saResultSolution: Solution = sa(10, 1000, 0.1, 10, 2);
    let isSAResultSolutionPermutation: boolean = isPermutation(saResultSolution.permutation);
    expect(isSAResultSolutionPermutation).toBe(true);
});