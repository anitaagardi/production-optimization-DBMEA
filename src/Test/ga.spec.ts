import { cycleCrossover } from "../Algorithms/Operators/GA/Crossover/cycleCrossover";
import { orderCrossover } from "../Algorithms/Operators/GA/Crossover/orderCrossover";
import { mutation } from "../Algorithms/Operators/GA/Mutation/mutation";
import { rouletteWheel } from "../Algorithms/Operators/GA/rouletteWheel";
import { ga } from "../Algorithms/Optimization/ga";
import { ONE_BENCHMARK_TANAKA } from "../constants";
import { BenchmarkReaderTanaka } from "../File/benchmarkReaderTanaka";
import { BENCHMARK_OPTIONS, setBenchmarkType } from "../File/benchmarkType";
import { Solution } from "../Model/solution";
import { fitnessValues } from "./fitnessValues";
import { isPermutation } from "./isPermutation";
import { mockSolutionPopulation } from "./mockData";

console.log = jest.fn();
test('order crossover operator test - is permutation?', () => {
    setBenchmarkType(BENCHMARK_OPTIONS[0]);
    Solution.benchmarkReaderTanaka = new BenchmarkReaderTanaka();
    Solution.benchmarkReaderTanaka.readOne(ONE_BENCHMARK_TANAKA);
    let parents: Solution[] = [mockSolutionPopulation()[0], mockSolutionPopulation()[1]];
    let orderCrossoverResultSolutions: Solution[] = orderCrossover(parents);
    let isOrderCrossoverResultPermutation: boolean = isPermutation(orderCrossoverResultSolutions[0].permutation);
    expect(isOrderCrossoverResultPermutation).toBe(true);
    isOrderCrossoverResultPermutation = isPermutation(orderCrossoverResultSolutions[1].permutation);
    expect(isOrderCrossoverResultPermutation).toBe(true);
});
test('cycle crossover operator test - is permutation?', () => {
    setBenchmarkType(BENCHMARK_OPTIONS[0]);
    Solution.benchmarkReaderTanaka = new BenchmarkReaderTanaka();
    Solution.benchmarkReaderTanaka.readOne(ONE_BENCHMARK_TANAKA);
    let parents: Solution[] = [mockSolutionPopulation()[0], mockSolutionPopulation()[1]];
    let cycleCrossoverResultSolutions: Solution[] = cycleCrossover(parents);
    let isCycleCrossoverResultPermutation: boolean = isPermutation(cycleCrossoverResultSolutions[0].permutation);
    expect(isCycleCrossoverResultPermutation).toBe(true);
    isCycleCrossoverResultPermutation = isPermutation(cycleCrossoverResultSolutions[1].permutation);
    expect(isCycleCrossoverResultPermutation).toBe(true);
});
test('order crossover operator test - is permutation?', () => {
    setBenchmarkType(BENCHMARK_OPTIONS[0]);
    Solution.benchmarkReaderTanaka = new BenchmarkReaderTanaka();
    Solution.benchmarkReaderTanaka.readOne(ONE_BENCHMARK_TANAKA);
    let parents: Solution[] = [mockSolutionPopulation()[0], mockSolutionPopulation()[1]];
    let orderCrossoverResultSolutions: Solution[] = orderCrossover(parents);
    let isOrderCrossoverResultPermutation: boolean = isPermutation(orderCrossoverResultSolutions[0].permutation);
    expect(isOrderCrossoverResultPermutation).toBe(true);
    isOrderCrossoverResultPermutation = isPermutation(orderCrossoverResultSolutions[1].permutation);
    expect(isOrderCrossoverResultPermutation).toBe(true);
});
test('mutation operator test - is permutation?', () => {
    setBenchmarkType(BENCHMARK_OPTIONS[0]);
    Solution.benchmarkReaderTanaka = new BenchmarkReaderTanaka();
    Solution.benchmarkReaderTanaka.readOne(ONE_BENCHMARK_TANAKA);
    let solution: Solution = mockSolutionPopulation()[0];
    let resultSolution: Solution = mutation(solution);
    let isResultPermutation: boolean = isPermutation(resultSolution.permutation);
    expect(isResultPermutation).toBe(true);

});
test('roulette wheel method test', () => {
    setBenchmarkType(BENCHMARK_OPTIONS[0]);
    let parents: number[] = rouletteWheel(fitnessValues());
    expect(parents).not.toBeUndefined();
    expect(parents.length).toEqual(2);
});

test('ga test - is permutation?', () => {
    setBenchmarkType(BENCHMARK_OPTIONS[0]);
    Solution.benchmarkReaderTanaka = new BenchmarkReaderTanaka();
    Solution.benchmarkReaderTanaka.readOne(ONE_BENCHMARK_TANAKA);
    let gaResultSolution: Solution = ga(10, 10, 2, 0.3, 0.3, 0.3, 0.1);
    let isGAResultSolutionPermutation: boolean = isPermutation(gaResultSolution.permutation);
    expect(isGAResultSolutionPermutation).toBe(true);
});