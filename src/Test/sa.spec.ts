import { threeOptMove } from "../Algorithms/Operators/SA/threeOptMove";
import { twoOptMove } from "../Algorithms/Operators/SA/twoOptMove";
import { sa } from "../Algorithms/Optimization/sa";
import { ONE_BENCHMARK_TANAKA } from "../constants";
import { BenchmarkReaderTanaka } from "../File/benchmarkReaderTanaka";
import { BENCHMARK_OPTIONS, setBenchmarkType } from "../File/benchmarkType";
import { Solution } from "../Model/solution";
import { isPermutation } from "./isPermutation";
import { mockSolutionPopulation } from "./mockData";
test('2-opt move operator test - is permutation?', () => {
    setBenchmarkType(BENCHMARK_OPTIONS[0]);
    Solution.benchmarkReaderTanaka = new BenchmarkReaderTanaka();
    Solution.benchmarkReaderTanaka.readOne(ONE_BENCHMARK_TANAKA);
    let solution: Solution = mockSolutionPopulation()[0];
    let resultSolution: Solution = twoOptMove(solution);
    let isResultPermutation: boolean = isPermutation(resultSolution.permutation);
    expect(isResultPermutation).toBe(true);

});
test('3-opt move operator test - is permutation?', () => {
    setBenchmarkType(BENCHMARK_OPTIONS[0]);
    Solution.benchmarkReaderTanaka = new BenchmarkReaderTanaka();
    Solution.benchmarkReaderTanaka.readOne(ONE_BENCHMARK_TANAKA);
    let solution: Solution = mockSolutionPopulation()[0];
    let resultSolution: Solution = threeOptMove(solution);
    let isResultPermutation: boolean = isPermutation(resultSolution.permutation);
    expect(isResultPermutation).toBe(true);

});
test('sa test - is permutation?', () => {
    setBenchmarkType(BENCHMARK_OPTIONS[0]);
    Solution.benchmarkReaderTanaka = new BenchmarkReaderTanaka();
    Solution.benchmarkReaderTanaka.readOne(ONE_BENCHMARK_TANAKA);
    let saResultSolution: Solution = sa(10, 1000, 0.1, 10, 2);
    let isSAResultSolutionPermutation: boolean = isPermutation(saResultSolution.permutation);
    expect(isSAResultSolutionPermutation).toBe(true);
});