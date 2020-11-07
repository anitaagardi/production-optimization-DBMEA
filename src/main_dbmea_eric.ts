import { BENCHMARKS_INSTANCES_PATH_ERIC } from "./constants";
import { dbmea } from "./Algorithms/Optimization/dbmea";
import { Utils } from "./File/util";
import { Solution } from "./Model/solution";
import * as fs from 'fs';
import { resetSeed } from "./Algorithms/Permutation/permutationGenerator";
import { BenchmarkReaderEric } from "./File/benchmarkReaderEric";
import { BenchmarkResultsReaderEric } from "./File/benchmarkResultsReaderEric";
import { BENCHMARK_OPTIONS, setBenchmarkType } from "./File/benchmarkType";

const files = Utils.getAllFiles(BENCHMARKS_INSTANCES_PATH_ERIC, []);

console.log("number of benchmarks: ", files.length);

const RESULTS_FILE = "results/Eric/all_benchmarks_dbmea.txt";

const hyperParameters = {
    population: [50],
    terminationCriteria: [5],
    clones: [5, 6],
    infections: [20, 10],
    segmentLengths: [4, 6],
    transferSegmentLengths: [5, 6]
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

const benchMarkResults = new BenchmarkResultsReaderEric;
const results = benchMarkResults.readAll();
setBenchmarkType(BENCHMARK_OPTIONS[1]);
for (const file of files) {
    let actualBenchmarkInstanceIndex = 0;
    console.log(file)
    Solution.benchmarkReaderEric = new BenchmarkReaderEric();
    Solution.benchmarkReaderEric.readTheFile(file);
    let fileSize: number = Solution.benchmarkReaderEric.getFileSize();
    for (let j = 0; j < fileSize; j++) {
        Solution.benchmarkReaderEric.setOneBenchmark(actualBenchmarkInstanceIndex);


        let optimum;
        let bestOptimum = 1000000;
        //benchMarkResults is out of use, because the benchmark file also contains the best known result
        //const benchmarkOptimum = benchMarkResults.findOptimum(actualBenchmarkInstanceIndex);
        const benchmarkOptimum = Solution.benchmarkReaderEric.bestFitness;
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
