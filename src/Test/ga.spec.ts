import { cycleCrossover } from "../Algorithms/Operators/GA/Crossover/cycleCrossover";
import { orderCrossover } from "../Algorithms/Operators/GA/Crossover/orderCrossover";
import { mutation } from "../Algorithms/Operators/GA/Mutation/mutation";
import { rouletteWheel } from "../Algorithms/Operators/GA/rouletteWheel";
import { ga } from "../Algorithms/Optimization/ga";
import { ONE_BENCHMARK } from "../constants";
import { BenchmarkReader } from "../File/benchmarkReader";
import { Solution } from "../Model/solution";
import { fitnessValues } from "./fitnessValues";
import { isPermutation } from "./isPermutation";
import { mockSolutionPopulation } from "./mockData";

console.log = jest.fn();
test('order crossover operator test - is permutation?', () => {
    Solution.benchmarkReader = new BenchmarkReader();
    Solution.benchmarkReader.readOne(ONE_BENCHMARK);
    let parents: Solution[] = [mockSolutionPopulation()[0], mockSolutionPopulation()[1]];
    let orderCrossoverResultSolutions: Solution[] = orderCrossover(parents);
    let isOrderCrossoverResultPermutation: boolean = isPermutation(orderCrossoverResultSolutions[0].permutation);
    expect(isOrderCrossoverResultPermutation).toBe(true);
    isOrderCrossoverResultPermutation = isPermutation(orderCrossoverResultSolutions[1].permutation);
    expect(isOrderCrossoverResultPermutation).toBe(true);
});
test('cycle crossover operator test - is permutation?', () => {
    Solution.benchmarkReader = new BenchmarkReader();
    Solution.benchmarkReader.readOne(ONE_BENCHMARK);
    let parents: Solution[] = [mockSolutionPopulation()[0], mockSolutionPopulation()[1]];
    let cycleCrossoverResultSolutions: Solution[] = cycleCrossover(parents);
    let isCycleCrossoverResultPermutation: boolean = isPermutation(cycleCrossoverResultSolutions[0].permutation);
    expect(isCycleCrossoverResultPermutation).toBe(true);
    isCycleCrossoverResultPermutation = isPermutation(cycleCrossoverResultSolutions[1].permutation);
    expect(isCycleCrossoverResultPermutation).toBe(true);
});
test('order crossover operator test - is permutation?', () => {
    Solution.benchmarkReader = new BenchmarkReader();
    Solution.benchmarkReader.readOne(ONE_BENCHMARK);
    let parents: Solution[] = [mockSolutionPopulation()[0], mockSolutionPopulation()[1]];
    let orderCrossoverResultSolutions: Solution[] = orderCrossover(parents);
    let isOrderCrossoverResultPermutation: boolean = isPermutation(orderCrossoverResultSolutions[0].permutation);
    expect(isOrderCrossoverResultPermutation).toBe(true);
    isOrderCrossoverResultPermutation = isPermutation(orderCrossoverResultSolutions[1].permutation);
    expect(isOrderCrossoverResultPermutation).toBe(true);
});
test('mutation operator test - is permutation?', () => {
    Solution.benchmarkReader = new BenchmarkReader();
    Solution.benchmarkReader.readOne(ONE_BENCHMARK);
    let solution: Solution = mockSolutionPopulation()[0];
    let resultSolution: Solution = mutation(solution);
    let isResultPermutation: boolean = isPermutation(resultSolution.permutation);
    expect(isResultPermutation).toBe(true);

});
test('roulette wheel method test', () => {
    let parents: number[] = rouletteWheel(fitnessValues());
    expect(parents).not.toBeUndefined();
    expect(parents.length).toEqual(2);
});

test('ga test - is permutation?', () => {
    Solution.benchmarkReader = new BenchmarkReader();
    Solution.benchmarkReader.readOne(ONE_BENCHMARK);
    let gaResultSolution: Solution = ga(10, 10, 2, 0.3, 0.3, 0.3, 0.1);
    let isGAResultSolutionPermutation: boolean = isPermutation(gaResultSolution.permutation);
    expect(isGAResultSolutionPermutation).toBe(true);
});