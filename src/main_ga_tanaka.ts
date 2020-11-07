import { BENCHMARKS_INSTANCES_PATH_TANAKA, ONE_BENCHMARK_TANAKA } from "./constants";
import { BenchmarkReaderTanaka } from "./File/benchmarkReaderTanaka";
import { BenchmarkResultsReaderTanaka } from "./File/benchmarkResultsReaderTanaka";
import { Utils } from "./File/util";
import { Solution } from "./Model/solution";
import * as fs from 'fs';
import { resetSeed } from "./Algorithms/Permutation/permutationGenerator";
import { ga } from "./Algorithms/Optimization/ga";
import { BENCHMARK_OPTIONS, setBenchmarkType } from "./File/benchmarkType";

const files = Utils.getAllFiles(BENCHMARKS_INSTANCES_PATH_TANAKA, []);

console.log("number of benchmarks: ", files.length);

const RESULTS_FILE = "results/Tanaka/all_benchmarks_ga.txt";

const hyperParameters = {
    terminationCriteria: [500, 1000],
    population: [50, 1000],
    elitism: [5],
    oxRate: [0.3],
    cxRate: [0.3],
    pmxRate: [0.3],
    mutationRate: [0.1]
}

const parameterIndexes = [

    Array.from(Array(hyperParameters.terminationCriteria.length), (v, i) => i),
    Array.from(Array(hyperParameters.population.length), (v, i) => i),
    Array.from(Array(hyperParameters.elitism.length), (v, i) => i),
    Array.from(Array(hyperParameters.oxRate.length), (v, i) => i),
    Array.from(Array(hyperParameters.cxRate.length), (v, i) => i),
    Array.from(Array(hyperParameters.pmxRate.length), (v, i) => i),
    Array.from(Array(hyperParameters.mutationRate.length), (v, i) => i)
];

const permutations = Utils.combineArraysRecursively(parameterIndexes);

const benchMarkResults = new BenchmarkResultsReaderTanaka;
const results = benchMarkResults.readAll();
setBenchmarkType(BENCHMARK_OPTIONS[0]);
for (const file of files) {
    console.log(file)
    Solution.benchmarkReaderTanaka = new BenchmarkReaderTanaka();
    Solution.benchmarkReaderTanaka.readOne(file);

    const currentBenchMarkName = file.substring(file.lastIndexOf('/') + 1, file.lastIndexOf('.'));
    const benchmarkOptimum = benchMarkResults.findOptimum(results, currentBenchMarkName);

    let optimum;
    let bestOptimum = 1000000;

    for (let i = 0; i < permutations.length; i++) {
        resetSeed();
        const terminationCriteria = hyperParameters.terminationCriteria[permutations[i][0]];
        const population = hyperParameters.population[permutations[i][1]];
        const elitism = hyperParameters.elitism[permutations[i][2]];
        const oxRate = hyperParameters.oxRate[permutations[i][3]];
        const cxRate = hyperParameters.cxRate[permutations[i][4]];
        const pmxRate = hyperParameters.pmxRate[permutations[i][5]];
        const mutationRate = hyperParameters.pmxRate[permutations[i][6]];

        console.log("parameters: ", terminationCriteria, population, elitism, oxRate, cxRate, pmxRate, mutationRate);

        const startTime = process.hrtime();

        let gaResultSolution: Solution = ga(terminationCriteria, population, elitism, oxRate, cxRate, pmxRate, mutationRate);

        optimum = gaResultSolution.fitness();

        const ellapsedTime = process.hrtime(startTime);

        if (bestOptimum > optimum) {
            bestOptimum = optimum;
        }

        console.log("calculated optimum [" + i + "]: " + optimum + " benchmark optimum: " + benchmarkOptimum + " [" + ellapsedTime[0] + " sec]");

        if (benchmarkOptimum > optimum) {
            fs.appendFileSync(RESULTS_FILE, "better found !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            fs.appendFileSync("parameters: ", terminationCriteria + " " + population + " " + elitism + " " + oxRate + " " + cxRate + " " + pmxRate + " " + mutationRate);
            console.log("Better found !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }
    }

    fs.appendFileSync(RESULTS_FILE, file + ": " + bestOptimum + " " + benchmarkOptimum + (bestOptimum == benchmarkOptimum ? " (=)" : "") + "\n");
}
