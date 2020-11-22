import { BENCHMARKS_INSTANCES_PATH_TAILLARD } from "./constants";
import { Utils } from "./File/util";
import { Solution } from "./Model/solution";
import * as fs from 'fs';
import { resetSeed } from "./Algorithms/Permutation/permutationGenerator";
import { sa } from "./Algorithms/Optimization/sa";
import { BenchmarkResultsReaderTaillard } from "./File/benchmarkResultsReaderTaillard";
import { BenchmarkReaderTaillard } from "./File/benchmarkReaderTaillard";
import { BENCHMARK_OPTIONS, setBenchmarkType } from "./File/benchmarkType";

const files = Utils.getAllFiles(BENCHMARKS_INSTANCES_PATH_TAILLARD, []);

console.log("number of benchmarks: ", files.length);

const RESULTS_FILE = "results/Taillard/all_benchmarks_sa.txt";

const hyperParameters = {
    terminationCriteria: [5000, 50000],
    temperature: [1000, 5000],
    alpha: [0.1, 0.5],
    length: [5, 10],
    optNumber: [3, 2] //only 2-opt / 3-opt
}



const parameterIndexes = [

    Array.from(Array(hyperParameters.terminationCriteria.length), (v, i) => i),
    Array.from(Array(hyperParameters.temperature.length), (v, i) => i),
    Array.from(Array(hyperParameters.alpha.length), (v, i) => i),
    Array.from(Array(hyperParameters.length.length), (v, i) => i),
    Array.from(Array(hyperParameters.optNumber.length), (v, i) => i)
];

const permutations = Utils.combineArraysRecursively(parameterIndexes);

const benchMarkResults = new BenchmarkResultsReaderTaillard;
benchMarkResults.readAll();

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
        //benchMarkResults is out of use, because the benchmark file also contains the best known result
        //const benchmarkOptimum = benchMarkResults.findOptimum(actualBenchmarkInstanceIndex);
        const benchmarkOptimum = Solution.benchmarkReaderTaillard.bestFitness;
        for (let i = 0; i < permutations.length; i++) {
            resetSeed();
            const terminationCriteria = hyperParameters.terminationCriteria[permutations[i][0]];
            const temperature = hyperParameters.temperature[permutations[i][1]];
            const alpha = hyperParameters.alpha[permutations[i][2]];
            const length = hyperParameters.length[permutations[i][3]];
            const optNumber = hyperParameters.optNumber[permutations[i][4]];


            console.log("parameters: ", terminationCriteria, temperature, alpha, length, optNumber);

            const startTime = process.hrtime();

            let saResultSolution: Solution = sa(terminationCriteria, temperature, alpha, length, optNumber);

            optimum = saResultSolution.fitness();

            const ellapsedTime = process.hrtime(startTime);

            if (bestOptimum > optimum) {
                bestOptimum = optimum;
            }

            console.log("calculated optimum [" + i + "]: " + optimum + " benchmark optimum: " + benchmarkOptimum + " [" + ellapsedTime[0] + " sec]");

            if (benchmarkOptimum > optimum) {
                fs.appendFileSync(RESULTS_FILE, "better found !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                fs.appendFileSync("parameters: ", terminationCriteria + " " + temperature + " " + alpha + " " + length + " " + optNumber);
                console.log("Better found !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            }
        }
        fs.appendFileSync(RESULTS_FILE, file + ": " + bestOptimum + " " + benchmarkOptimum + (bestOptimum == benchmarkOptimum ? " (=)" : "") + "\n");
        actualBenchmarkInstanceIndex++;
    }
}
