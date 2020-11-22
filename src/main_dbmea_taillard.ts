import { BENCHMARKS_INSTANCES_PATH_TAILLARD } from "./constants";
import { dbmea } from "./Algorithms/Optimization/dbmea";
import { Utils } from "./File/util";
import { Solution } from "./Model/solution";
import * as fs from 'fs';
import { resetSeed } from "./Algorithms/Permutation/permutationGenerator";
import { BenchmarkReaderTaillard } from "./File/benchmarkReaderTaillard";
import { BenchmarkResultsReaderTaillard } from "./File/benchmarkResultsReaderTaillard";
import { BENCHMARK_OPTIONS, setBenchmarkType } from "./File/benchmarkType";

const files = Utils.getAllFiles(BENCHMARKS_INSTANCES_PATH_TAILLARD, []);

console.log("number of benchmarks: ", files.length);

const RESULTS_FILE = "results/Taillard/all_benchmarks_dbmea.txt";

/*const hyperParameters = {
    population: [50],
    terminationCriteria: [5],
    clones: [5, 6],
    infections: [20, 10],
    segmentLengths: [4, 6],
    transferSegmentLengths: [5, 6]
}*/

const hyperParameters = {
    population: [5],
    terminationCriteria: [5],
    clones: [5],
    infections: [20],
    segmentLengths: [4],
    transferSegmentLengths: [5]
}

const parameterIndexes = [
    Array.from(Array(hyperParameters.population.length), (v, i) => i),
    Array.from(Array(hyperParameters.terminationCriteria.length), (v, i) => i),
    Array.from(Array(hyperParameters.clones.length), (v, i) => i),
    Array.from(Array(hyperParameters.infections.length), (v, i) => i),
    Array.from(Array(hyperParameters.segmentLengths.length), (v, i) => i),
    Array.from(Array(hyperParameters.transferSegmentLengths.length), (v, i) => i)
];

const permutations = Utils.combineArraysRecursively(parameterIndexes);

const benchMarkResults = new BenchmarkResultsReaderTaillard;
const results = benchMarkResults.readAll();
setBenchmarkType(BENCHMARK_OPTIONS[1]);
for (const file of files) {
    let actualBenchmarkInstanceIndex = 0;
    console.log(file)
    Solution.benchmarkReaderTaillard = new BenchmarkReaderTaillard();
    Solution.benchmarkReaderTaillard.readTheFile(file);
    let fileSize: number = Solution.benchmarkReaderTaillard.getFileSize();
    for (let j = 0; j < fileSize; j++) {
        Solution.benchmarkReaderTaillard.setOneBenchmark(actualBenchmarkInstanceIndex);


        let optimum;
        let bestOptimum = 1000000;

        const benchmarkOptimum = benchMarkResults.findOptimum(actualBenchmarkInstanceIndex);

        for (let i = 0; i < permutations.length; i++) {
            resetSeed();

            const population = hyperParameters.population[permutations[i][0]];
            const terminationCriteria = hyperParameters.terminationCriteria[permutations[i][1]];
            const clone = hyperParameters.clones[permutations[i][2]];
            const infection = hyperParameters.infections[permutations[i][3]];
            const segmentLength = hyperParameters.segmentLengths[permutations[i][4]];
            const transferSegmentLength = hyperParameters.transferSegmentLengths[permutations[i][5]];

            console.log("parameters: ", population, terminationCriteria, clone, infection, segmentLength, transferSegmentLength);

            const startTime = process.hrtime();

            let dbmeaResultSolution: Solution = dbmea(population, terminationCriteria, clone, infection, segmentLength, transferSegmentLength);

            optimum = dbmeaResultSolution.fitness();

            const ellapsedTime = process.hrtime(startTime);

            if (bestOptimum > optimum) {
                bestOptimum = optimum;
            }

            console.log("calculated optimum [" + i + "]: " + optimum + " benchmark optimum: " + benchmarkOptimum + " [" + ellapsedTime[0] + " sec]");

            if (benchmarkOptimum > optimum) {
                fs.appendFileSync(RESULTS_FILE, "better found !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                fs.appendFileSync("parameters: ", population + " " + terminationCriteria + " " + clone + " " + infection
                    + " " + segmentLength + " " + transferSegmentLength);
                console.log("Better found !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            }
        }

        fs.appendFileSync(RESULTS_FILE, file + ": " + bestOptimum + " " + benchmarkOptimum + (bestOptimum == benchmarkOptimum ? " (=)" : "") + "\n");
        actualBenchmarkInstanceIndex++;
    }
}
